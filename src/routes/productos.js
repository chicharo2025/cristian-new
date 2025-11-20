const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos.controller');

// GET /api/productos - Obtener todos los productos
router.get('/', productosController.getAll);

// GET /api/productos/:id - Obtener producto por ID
router.get('/:id', productosController.getById);

// POST /api/productos - Crear nuevo producto
router.post('/', productosController.create);

// PUT /api/productos/:id - Actualizar producto
router.put('/:id', productosController.update);

// DELETE /api/productos/:id - Eliminar producto (soft delete)
router.delete('/:id', productosController.delete);

// GET /api/productos/categoria/:categoriaId - Obtener productos por categoría
router.get('/categoria/:categoriaId', productosController.getByCategoria);

// GET /api/productos/talla/:tallaId - Obtener productos por talla
router.get('/talla/:tallaId', productosController.getByTalla);

module.exports = router;