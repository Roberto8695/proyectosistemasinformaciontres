const express = require('express');

const marcaRoutes = require('./marcaRoutes');
const productoRoutes = require('./productoRoutes');
const detalleCarritoRoutes = require('./detalleCarritoRoutes');
const router = express.Router();

router.use('/marcas', marcaRoutes);
router.use('/productos', productoRoutes);
router.use('/detalleCarrito', detalleCarritoRoutes);
module.exports = router;
