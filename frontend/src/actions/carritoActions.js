"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../api/client';

// Crear el contexto del carrito
const CarritoContext = createContext();

// Hook personalizado para usar el contexto del carrito
export const useCarrito = () => {
  const context = useContext(CarritoContext);
  if (!context) {
    throw new Error('useCarrito debe ser usado dentro de un CarritoProvider');
  }
  return context;
};

// Proveedor del contexto del carrito
export const CarritoProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [carritoId, setCarritoId] = useState(null);

  // Inicializar el carrito al cargar la página
  useEffect(() => {
    const initCarrito = async () => {
      try {
        // Intentar obtener el ID del carrito del localStorage
        const storedCarritoId = localStorage.getItem('carritoId');
        const storedItems = localStorage.getItem('carritoItems');
        
        if (storedCarritoId) {
          setCarritoId(parseInt(storedCarritoId));
          
          if (storedItems) {
            try {
              const parsedItems = JSON.parse(storedItems);
              setItems(parsedItems);
              
              // Calcular el total
              const calculatedTotal = parsedItems.reduce((sum, item) => sum + (item.total || 0), 0);
              setTotal(calculatedTotal);
            } catch (parseErr) {
              console.error('Error al parsear items del localStorage:', parseErr);
              setItems([]);
              setTotal(0);
            }
          } else {
            // Intentar cargar desde el servidor
            try {
              await cargarItemsCarrito(parseInt(storedCarritoId));
            } catch (err) {
              console.error('Error al cargar items del servidor:', err);
              setItems([]);
              setTotal(0);
            }
          }
        } else {
          // Si no hay ID de carrito, crear uno nuevo
          const newCarritoId = Date.now();
          setCarritoId(newCarritoId);
          localStorage.setItem('carritoId', newCarritoId.toString());
          setItems([]);
          setTotal(0);
        }
      } catch (err) {
        console.error('Error al inicializar el carrito:', err);
        // Crear un ID temporal para el carrito
        const tempCarritoId = Date.now();
        setCarritoId(tempCarritoId);
        localStorage.setItem('carritoId', tempCarritoId.toString());
        setItems([]);
        setTotal(0);
      }
    };
    
    initCarrito();
  }, []);

  // Crear un nuevo carrito
  const crearNuevoCarrito = async () => {
    try {
      setLoading(true);
      const response = await apiClient.post('/carritos', {
        // Puedes incluir datos adicionales como el ID del usuario si está autenticado
      });
      
      const nuevoCarritoId = response.data.id_carrito;
      setCarritoId(nuevoCarritoId);
      localStorage.setItem('carritoId', nuevoCarritoId.toString());
      
      setItems([]);
      setTotal(0);
      setError(null);
      
      return nuevoCarritoId;
    } catch (err) {
      console.error('Error al crear nuevo carrito:', err);
      setError('No se pudo crear un nuevo carrito');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cargar los items del carrito desde la API
  const cargarItemsCarrito = async (id) => {
    if (!id) return;
    
    try {
      setLoading(true);
      
      try {
        const response = await apiClient.get(`/detalles/carrito/${id}`);
        setItems(response.data || []);
        
        // Calcular el total
        try {
          const totalResponse = await apiClient.get(`/detalles/carrito/${id}/total`);
          setTotal(totalResponse.data?.total || 0);
        } catch (totalErr) {
          console.error('Error al obtener el total del carrito:', totalErr);
          // Calcular el total manualmente a partir de los items
          const calculatedTotal = response.data?.reduce((sum, item) => sum + (item.total || 0), 0) || 0;
          setTotal(calculatedTotal);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error al cargar items del carrito:', err);
        
        // Intentar recuperar items del localStorage
        const storedItems = localStorage.getItem('carritoItems');
        if (storedItems) {
          try {
            const parsedItems = JSON.parse(storedItems);
            setItems(parsedItems);
            
            // Calcular el total
            const calculatedTotal = parsedItems.reduce((sum, item) => sum + (item.total || 0), 0);
            setTotal(calculatedTotal);
          } catch (parseErr) {
            console.error('Error al parsear items del localStorage:', parseErr);
            setItems([]);
            setTotal(0);
          }
        } else {
          setItems([]);
          setTotal(0);
        }
        
        setError('No se pudieron cargar los productos del carrito');
      }
    } finally {
      setLoading(false);
    }
  };

  // Añadir un producto al carrito (modo offline)
  const agregarProducto = async (producto, cantidad = 1) => {
    try {
      setLoading(true);
      
      // Verificar si el producto ya existe en el carrito
      const itemExistente = items.find(item => item.id_producto === producto.id_producto);
      
      if (itemExistente) {
        // Si existe, actualizar la cantidad
        const nuevaCantidad = itemExistente.cantidad + cantidad;
        await actualizarCantidad(itemExistente.id_detalle_carrito, nuevaCantidad);
        return;
      }
      
      // Si no existe, crear un nuevo item
      const nuevoItem = {
        id_detalle_carrito: Date.now(),
        id_carrito: carritoId,
        id_producto: producto.id_producto,
        cantidad,
        precio_unitario: producto.precio_oferta || producto.precio,
        total: (producto.precio_oferta || producto.precio) * cantidad,
        nombre: producto.nombre,
        imagen: producto.imagen,
        marca_nombre: producto.marca_nombre || producto.marca
      };
      
      const nuevosItems = [...items, nuevoItem];
      setItems(nuevosItems);
      
      // Actualizar el total
      const nuevoTotal = total + nuevoItem.total;
      setTotal(nuevoTotal);
      
      // Guardar en localStorage
      localStorage.setItem('carritoItems', JSON.stringify(nuevosItems));
      
      return nuevoItem;
    } catch (err) {
      console.error('Error al agregar producto al carrito:', err);
      setError('No se pudo agregar el producto al carrito');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Actualizar la cantidad de un producto en el carrito
  const actualizarCantidad = async (detalleId, cantidad) => {
    if (!carritoId) return;
    
    try {
      setLoading(true);
      const response = await apiClient.put(`/detalles/${detalleId}`, {
        cantidad
      });
      
      // Actualizar los items del carrito
      await cargarItemsCarrito(carritoId);
      
      return response.data;
    } catch (err) {
      console.error('Error al actualizar cantidad del producto:', err);
      setError(err.response?.data?.error || 'No se pudo actualizar la cantidad del producto');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Eliminar un producto del carrito
  const eliminarProducto = async (detalleId) => {
    if (!carritoId) return;
    
    try {
      setLoading(true);
      const response = await apiClient.delete(`/detalles/${detalleId}`);
      
      // Actualizar los items del carrito
      await cargarItemsCarrito(carritoId);
      
      return response.data;
    } catch (err) {
      console.error('Error al eliminar producto del carrito:', err);
      setError('No se pudo eliminar el producto del carrito');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Vaciar el carrito
  const vaciarCarrito = async () => {
    if (!carritoId) return;
    
    try {
      setLoading(true);
      const response = await apiClient.delete(`/detalles/carrito/${carritoId}`);
      
      setItems([]);
      setTotal(0);
      
      return response.data;
    } catch (err) {
      console.error('Error al vaciar el carrito:', err);
      setError('No se pudo vaciar el carrito');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Calcular el número total de items en el carrito
  const cantidadTotal = items.reduce((acc, item) => acc + item.cantidad, 0);

  // Valor del contexto
  const value = {
    items,
    loading,
    error,
    total,
    cantidadTotal,
    carritoId,
    agregarProducto,
    actualizarCantidad,
    eliminarProducto,
    vaciarCarrito,
    cargarItemsCarrito
  };

  return (
    <CarritoContext.Provider value={value}>
      {children}
    </CarritoContext.Provider>
  );
};
