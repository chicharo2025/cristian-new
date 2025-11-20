const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuarios.controller');

// GET /api/usuarios - Obtener todos los usuarios
router.get('/', usuariosController.getAll);

// GET /api/usuarios/:id - Obtener usuario por ID
router.get('/:id', usuariosController.getById);

// POST /api/usuarios - Crear nuevo usuario
router.post('/', usuariosController.create);

// PUT /api/usuarios/:id - Actualizar usuario
router.put('/:id', usuariosController.update);

// DELETE /api/usuarios/:id - Eliminar usuario (soft delete)
router.delete('/:id', usuariosController.delete);

// POST /api/usuarios/login - Login de usuario
router.post('/login', usuariosController.login);

// PUT /api/usuarios/:id/password - Cambiar contraseña
router.put('/:id/password', usuariosController.updatePassword);

// GET /api/usuarios/rol/:rolId - Obtener usuarios por rol
router.get('/rol/:rolId', usuariosController.getByRol);

module.exports = router;