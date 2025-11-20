const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventas.controller');

// GET /api/ventas - Obtener todas las ventas
router.get('/', ventasController.getAll);

// GET /api/ventas/:id - Obtener venta por ID
router.get('/:id', ventasController.getById);

// POST /api/ventas - Crear nueva venta (con transacción)
router.post('/', ventasController.create);

// PUT /api/ventas/:id/estado - Actualizar estado de venta
router.put('/:id/estado', ventasController.updateEstado);

// GET /api/ventas/cliente/:clienteId - Obtener ventas por cliente
router.get('/cliente/:clienteId', ventasController.getByCliente);

// GET /api/ventas/estado/:estadoId - Obtener ventas por estado
router.get('/estado/:estadoId', ventasController.getByEstado);

module.exports = router;