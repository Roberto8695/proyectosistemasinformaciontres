const DetalleCarrito = require('../models/detalleCarritoModel');
const Producto = require('../models/productoModel');

// Obtener todos los detalles de un carrito
const obtenerDetallesCarrito = async (req, res) => {
  try {
    const carritoId = parseInt(req.params.carritoId);
    const detalles = await DetalleCarrito.getDetallesByCarritoId(carritoId);
    res.json(detalles);
  } catch (error) {
    console.error('Error al obtener detalles del carrito:', error);
    res.status(500).json({ error: 'Error al obtener los detalles del carrito' });
  }
};

// Añadir un producto al carrito
const agregarProductoAlCarrito = async (req, res) => {
  try {
    const { id_carrito, id_producto, cantidad } = req.body;
    
    if (!id_carrito || !id_producto || !cantidad) {
      return res.status(400).json({ 
        error: 'Los campos id_carrito, id_producto y cantidad son obligatorios' 
      });
    }
    
    // Verificar que el producto exista y obtener su precio
    const producto = await Producto.getProductoById(id_producto);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    
    // Verificar que haya suficiente stock
    if (producto.cantidad < cantidad) {
      return res.status(400).json({ 
        error: 'No hay suficiente stock disponible',
        stockDisponible: producto.cantidad
      });
    }
    
    // Usar el precio de oferta si existe, de lo contrario usar el precio normal
    const precio = producto.precio_oferta || producto.precio;
    
    const nuevoDetalle = await DetalleCarrito.addProductToCarrito({
      id_carrito,
      id_producto,
      cantidad,
      precio_unitario: precio
    });
    
    // Obtener el detalle con información adicional del producto
    const detalleCompleto = await DetalleCarrito.getDetalleById(nuevoDetalle.id_detalle_carrito);
    
    res.status(201).json(detalleCompleto);
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
};

// Actualizar la cantidad de un producto en el carrito
const actualizarCantidadProducto = async (req, res) => {
  try {
    const detalleId = parseInt(req.params.detalleId);
    const { cantidad } = req.body;
    
    if (!cantidad || cantidad <= 0) {
      return res.status(400).json({ error: 'La cantidad debe ser mayor a cero' });
    }
    
    // Obtener el detalle actual para verificar el producto
    const detalleActual = await DetalleCarrito.getDetalleById(detalleId);
    if (!detalleActual) {
      return res.status(404).json({ error: 'Detalle de carrito no encontrado' });
    }
    
    // Verificar que haya suficiente stock
    const producto = await Producto.getProductoById(detalleActual.id_producto);
    if (producto.cantidad < cantidad) {
      return res.status(400).json({ 
        error: 'No hay suficiente stock disponible',
        stockDisponible: producto.cantidad
      });
    }
    
    const detalleActualizado = await DetalleCarrito.updateDetalleCarrito(detalleId, cantidad);
    
    // Obtener el detalle actualizado con información adicional del producto
    const detalleCompleto = await DetalleCarrito.getDetalleById(detalleActualizado.id_detalle_carrito);
    
    res.json(detalleCompleto);
  } catch (error) {
    console.error('Error al actualizar cantidad del producto:', error);
    res.status(500).json({ error: 'Error al actualizar la cantidad del producto' });
  }
};

// Eliminar un producto del carrito
const eliminarProductoDelCarrito = async (req, res) => {
  try {
    const detalleId = parseInt(req.params.detalleId);
    
    const detalleEliminado = await DetalleCarrito.removeProductFromCarrito(detalleId);
    
    if (!detalleEliminado) {
      return res.status(404).json({ error: 'Detalle de carrito no encontrado' });
    }
    
    res.json({ 
      mensaje: 'Producto eliminado del carrito correctamente', 
      detalle: detalleEliminado 
    });
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ error: 'Error al eliminar el producto del carrito' });
  }
};

// Vaciar el carrito
const vaciarCarrito = async (req, res) => {
  try {
    const carritoId = parseInt(req.params.carritoId);
    
    const detallesEliminados = await DetalleCarrito.clearCarrito(carritoId);
    
    res.json({ 
      mensaje: 'Carrito vaciado correctamente', 
      detalles: detallesEliminados 
    });
  } catch (error) {
    console.error('Error al vaciar el carrito:', error);
    res.status(500).json({ error: 'Error al vaciar el carrito' });
  }
};

// Obtener el total del carrito
const obtenerTotalCarrito = async (req, res) => {
  try {
    const carritoId = parseInt(req.params.carritoId);
    
    const total = await DetalleCarrito.getCarritoTotal(carritoId);
    
    res.json({ total });
  } catch (error) {
    console.error('Error al obtener el total del carrito:', error);
    res.status(500).json({ error: 'Error al obtener el total del carrito' });
  }
};

module.exports = {
  obtenerDetallesCarrito,
  agregarProductoAlCarrito,
  actualizarCantidadProducto,
  eliminarProductoDelCarrito,
  vaciarCarrito,
  obtenerTotalCarrito
};
