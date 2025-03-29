const express = require('express');
const { 
  obtenerDetallesCarrito,
  agregarProductoAlCarrito,
  actualizarCantidadProducto,
  eliminarProductoDelCarrito,
  vaciarCarrito,
  obtenerTotalCarrito
} = require('../controllers/detalleCarritoController');

const router = express.Router();

// Obtener todos los detalles de un carrito
router.get('/carrito/:carritoId', obtenerDetallesCarrito);

// Obtener el total del carrito
router.get('/carrito/:carritoId/total', obtenerTotalCarrito);

// Añadir un producto al carrito
router.post('/', agregarProductoAlCarrito);

// Actualizar la cantidad de un producto en el carrito
router.put('/:detalleId', actualizarCantidadProducto);

// Eliminar un producto del carrito
router.delete('/:detalleId', eliminarProductoDelCarrito);

// Vaciar el carrito
router.delete('/carrito/:carritoId', vaciarCarrito);

module.exports = router;
