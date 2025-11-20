const express = require('express');
const router = express.Router();
const detalleComprasController = require('../controllers/detalleCompras.controller');

// GET /api/detalle-compras - Obtener todos los detalles de compras
router.get('/', detalleComprasController.getAll);

// GET /api/detalle-compras/:id - Obtener detalle por ID
router.get('/:id', detalleComprasController.getById);

// GET /api/detalle-compras/compra/:compraId - Obtener detalles por compra
router.get('/compra/:compraId', detalleComprasController.getByCompraId);

// POST /api/detalle-compras - Crear nuevo detalle de compra
router.post('/', detalleComprasController.create);

// PUT /api/detalle-compras/:id - Actualizar detalle de compra
router.put('/:id', detalleComprasController.update);

// DELETE /api/detalle-compras/:id - Eliminar detalle de compra
router.delete('/:id', detalleComprasController.delete);

module.exports = router;