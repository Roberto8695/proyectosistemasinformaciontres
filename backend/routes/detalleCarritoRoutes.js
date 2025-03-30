const express = require('express');
const router = express.Router();
const { 
  obtenerDetallesCarrito,
  addProductToCarrito,
  actualizarCantidadProducto,
  eliminarProductoDelCarrito,
  vaciarCarrito,
  obtenerTotalCarrito
} = require('../controllers/detalleCarritoController');

// Obtener todos los detalles de un carrito
router.get('/carrito/:id', obtenerDetallesCarrito);

// Obtener el total del carrito
router.get('/carrito/:id/total', obtenerTotalCarrito);

// Añadir un producto al carrito
router.post('/', addProductToCarrito);

// Actualizar la cantidad de un producto en el carrito
router.put('/:id', actualizarCantidadProducto);

// Eliminar un producto del carrito
router.delete('/:id', eliminarProductoDelCarrito);

// Vaciar el carrito
router.delete('/carrito/:id', vaciarCarrito);

module.exports = router;
