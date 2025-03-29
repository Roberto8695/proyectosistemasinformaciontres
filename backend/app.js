const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'public')));
module.exports = app;
