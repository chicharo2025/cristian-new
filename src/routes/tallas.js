const express = require('express');
const router = express.Router();
const tallasController = require('../controllers/tallas.controller');

// GET /api/tallas - Obtener todas las tallas
router.get('/', tallasController.getAll);

// GET /api/tallas/:id - Obtener talla por ID
router.get('/:id', tallasController.getById);

// POST /api/tallas - Crear nueva talla
router.post('/', tallasController.create);

// PUT /api/tallas/:id - Actualizar talla
router.put('/:id', tallasController.update);

// DELETE /api/tallas/:id - Eliminar talla
router.delete('/:id', tallasController.delete);

module.exports = router;