const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api', require('./routes'));

// Ruta de salud
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    endpoints: {
      productos: '/api/productos',
      categorias: '/api/categorias',
      proveedores: '/api/proveedores',
      compras: '/api/compras',
      ventas: '/api/ventas',
      clientes: '/api/clientes',
      usuarios: '/api/usuarios',
      roles: '/api/roles',
      permisos: '/api/permisos',
      estados: '/api/estados',
      tallas: '/api/tallas',
      devoluciones: '/api/devoluciones'
    }
  });
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    message: '🚀 Bienvenido a la API de Gestión de Productos',
    version: '1.0.0',
    documentation: 'Consulta /health para ver todos los endpoints disponibles'
  });
});

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Manejo de errores global
app.use((error, req, res, next) => {
  console.error('Error global:', error);
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'production' ? {} : error.message
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en puerto ${PORT}`);
  console.log(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Health check: http://localhost:${PORT}/health`);
  console.log(`🗄️  Base de datos: ${process.env.DATABASE_URL ? 'Conectada' : 'No configurada'}`);
});

module.exports = app;