const express = require('express');
const router = express.Router();
const detalleVentasController = require('../controllers/detalleVentas.controller');

// GET /api/detalle-ventas - Obtener todos los detalles de ventas
router.get('/', detalleVentasController.getAll);

// GET /api/detalle-ventas/:id - Obtener detalle por ID
router.get('/:id', detalleVentasController.getById);

// GET /api/detalle-ventas/venta/:ventaId - Obtener detalles por venta
router.get('/venta/:ventaId', detalleVentasController.getByVentaId);

// POST /api/detalle-ventas - Crear nuevo detalle de venta
router.post('/', detalleVentasController.create);

// PUT /api/detalle-ventas/:id - Actualizar detalle de venta
router.put('/:id', detalleVentasController.update);

// DELETE /api/detalle-ventas/:id - Eliminar detalle de venta
router.delete('/:id', detalleVentasController.delete);

module.exports = router;