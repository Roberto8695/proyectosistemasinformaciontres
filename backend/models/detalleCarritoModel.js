const { pool } = require('../config/db');

// Obtener todos los detalles de un carrito específico
const getDetallesByCarritoId = async (carritoId) => {
  const result = await pool.query(`
    SELECT dc.*, p.nombre, p.imagen, m.nombre as marca_nombre
    FROM detalle_carrito dc
    JOIN producto p ON dc.id_producto = p.id_producto
    LEFT JOIN marca m ON p.id_marca = m.id_marca
    WHERE dc.id_carrito = $1
    ORDER BY dc.fecha_agregado DESC
  `, [carritoId]);
  return result.rows;
};

// Obtener un detalle específico por su ID
const getDetalleById = async (detalleId) => {
  const result = await pool.query(`
    SELECT dc.*, p.nombre, p.imagen, m.nombre as marca_nombre
    FROM detalle_carrito dc
    JOIN producto p ON dc.id_producto = p.id_producto
    LEFT JOIN marca m ON p.id_marca = m.id_marca
    WHERE dc.id_detalle_carrito = $1
  `, [detalleId]);
  return result.rows[0];
};

// Añadir un producto al carrito
const addProductToCarrito = async (detalleCarrito) => {
  const { id_carrito, id_producto, cantidad, precio_unitario } = detalleCarrito;
  
  // Calcular el total
  const total = precio_unitario * cantidad;
  
  // Verificar si el producto ya existe en el carrito
  const existingProduct = await pool.query(
    'SELECT * FROM detalle_carrito WHERE id_carrito = $1 AND id_producto = $2',
    [id_carrito, id_producto]
  );
  
  if (existingProduct.rows.length > 0) {
    // Si el producto ya existe, actualizar la cantidad y el total
    const result = await pool.query(
      `UPDATE detalle_carrito 
       SET cantidad = cantidad + $1, 
           total = precio_unitario * (cantidad + $1),
           fecha_agregado = CURRENT_TIMESTAMP
       WHERE id_carrito = $2 AND id_producto = $3
       RETURNING *`,
      [cantidad, id_carrito, id_producto]
    );
    return result.rows[0];
  } else {
    // Si el producto no existe, crear un nuevo detalle
    const result = await pool.query(
      `INSERT INTO detalle_carrito (id_carrito, id_producto, cantidad, precio_unitario, total, fecha_agregado)
       VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
       RETURNING *`,
      [id_carrito, id_producto, cantidad, precio_unitario, total]
    );
    return result.rows[0];
  }
};

// Actualizar la cantidad de un producto en el carrito
const updateDetalleCarrito = async (detalleId, cantidad) => {
  // Primero obtenemos el detalle actual para conocer el precio unitario
  const currentDetalle = await pool.query(
    'SELECT precio_unitario FROM detalle_carrito WHERE id_detalle_carrito = $1',
    [detalleId]
  );
  
  if (currentDetalle.rows.length === 0) {
    throw new Error('Detalle de carrito no encontrado');
  }
  
  const { precio_unitario } = currentDetalle.rows[0];
  const total = precio_unitario * cantidad;
  
  const result = await pool.query(
    `UPDATE detalle_carrito 
     SET cantidad = $1, 
         total = $2,
         fecha_agregado = CURRENT_TIMESTAMP
     WHERE id_detalle_carrito = $3
     RETURNING *`,
    [cantidad, total, detalleId]
  );
  
  return result.rows[0];
};

// Eliminar un producto del carrito
const removeProductFromCarrito = async (detalleId) => {
  const result = await pool.query(
    'DELETE FROM detalle_carrito WHERE id_detalle_carrito = $1 RETURNING *',
    [detalleId]
  );
  return result.rows[0];
};

// Vaciar un carrito (eliminar todos los productos)
const clearCarrito = async (carritoId) => {
  const result = await pool.query(
    'DELETE FROM detalle_carrito WHERE id_carrito = $1 RETURNING *',
    [carritoId]
  );
  return result.rows;
};

// Obtener el total del carrito
const getCarritoTotal = async (carritoId) => {
  const result = await pool.query(
    'SELECT SUM(total) as total FROM detalle_carrito WHERE id_carrito = $1',
    [carritoId]
  );
  return result.rows[0].total || 0;
};

module.exports = {
  getDetallesByCarritoId,
  getDetalleById,
  addProductToCarrito,
  updateDetalleCarrito,
  removeProductFromCarrito,
  clearCarrito,
  getCarritoTotal
};
