    const express = require('express');
const router = express.Router();
const permisosController = require('../controllers/permisos.controller');

// GET /api/permisos - Obtener todos los permisos
router.get('/', permisosController.getAll);

// GET /api/permisos/:id - Obtener permiso por ID
router.get('/:id', permisosController.getById);

// POST /api/permisos - Crear nuevo permiso
router.post('/', permisosController.create);

// PUT /api/permisos/:id - Actualizar permiso
router.put('/:id', permisosController.update);

// DELETE /api/permisos/:id - Eliminar permiso
router.delete('/:id', permisosController.delete);

module.exports = router;