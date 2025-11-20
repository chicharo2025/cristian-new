const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientes.controller');

// GET /api/clientes - Obtener todos los clientes
router.get('/', clientesController.getAll);

// GET /api/clientes/:id - Obtener cliente por ID
router.get('/:id', clientesController.getById);

// POST /api/clientes - Crear nuevo cliente
router.post('/', clientesController.create);

// PUT /api/clientes/:id - Actualizar cliente
router.put('/:id', clientesController.update);

// DELETE /api/clientes/:id - Eliminar cliente (soft delete)
router.delete('/:id', clientesController.delete);

// GET /api/clientes/ciudad/:ciudad - Obtener clientes por ciudad
router.get('/ciudad/:ciudad', clientesController.getByCiudad);

// GET /api/clientes/departamento/:departamento - Obtener clientes por departamento
router.get('/departamento/:departamento', clientesController.getByDepartamento);

module.exports = router;