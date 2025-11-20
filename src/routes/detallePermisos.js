const express = require('express');
const router = express.Router();
const detallePermisosController = require('../controllers/detallePermisos.controller');

// GET /api/detalle-permisos - Obtener todos los detalles de permisos
router.get('/', detallePermisosController.getAll);

// GET /api/detalle-permisos/:id - Obtener detalle por ID
router.get('/:id', detallePermisosController.getById);

// GET /api/detalle-permisos/rol/:rolId - Obtener permisos por rol
router.get('/rol/:rolId', detallePermisosController.getByRolId);

// POST /api/detalle-permisos - Asignar permiso a rol
router.post('/', detallePermisosController.create);

// DELETE /api/detalle-permisos/:id - Remover permiso de rol
router.delete('/:id', detallePermisosController.delete);

// DELETE /api/detalle-permisos/rol/:rolId/permiso/:permisoId - Remover permiso específico
router.delete('/rol/:rolId/permiso/:permisoId', detallePermisosController.deleteByRolAndPermiso);

module.exports = router;