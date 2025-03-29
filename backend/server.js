require('dotenv').config();
const app = require('./app');
const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 5000;

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Importar el archivo de inicialización de directorios
require('./config/initDirectories');

// Importar las rutas de detalle_carrito
const detalleCarritoRoutes = require('./routes/detalleCarritoRoutes');

// Rutas de la API
app.use('/api/marcas', marcaRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/detalles', detalleCarritoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
