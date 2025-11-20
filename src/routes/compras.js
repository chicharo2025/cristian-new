const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/compras.controller');

// GET /api/compras - Obtener todas las compras
router.get('/', comprasController.getAll);

// GET /api/compras/:id - Obtener compra por ID
router.get('/:id', comprasController.getById);

// POST /api/compras - Crear nueva compra (con transacción)
router.post('/', comprasController.create);

// GET /api/compras/proveedor/:proveedorId - Obtener compras por proveedor
router.get('/proveedor/:proveedorId', comprasController.getByProveedor);

// PUT /api/compras/:id/estado - Actualizar estado de compra
router.put('/:id/estado', comprasController.updateEstado);

module.exports = router;