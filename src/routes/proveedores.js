const express = require('express');
const router = express.Router();
const proveedoresController = require('../controllers/proveedores.controller');

// GET /api/proveedores - Obtener todos los proveedores
router.get('/', proveedoresController.getAll);

// GET /api/proveedores/:id - Obtener proveedor por ID
router.get('/:id', proveedoresController.getById);

// POST /api/proveedores - Crear nuevo proveedor
router.post('/', proveedoresController.create);

// PUT /api/proveedores/:id - Actualizar proveedor
router.put('/:id', proveedoresController.update);

// DELETE /api/proveedores/:id - Eliminar proveedor (soft delete)
router.delete('/:id', proveedoresController.delete);

// GET /api/proveedores/documento/:numero - Buscar por número de documento
router.get('/documento/:numero', proveedoresController.getByDocumento);

module.exports = router;