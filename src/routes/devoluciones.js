const express = require('express');
const router = express.Router();
const devolucionesController = require('../controllers/devoluciones.controller');

// GET /api/devoluciones - Obtener todas las devoluciones
router.get('/', devolucionesController.getAll);

// GET /api/devoluciones/:id - Obtener devolución por ID
router.get('/:id', devolucionesController.getById);

// POST /api/devoluciones - Crear nueva devolución (con transacción)
router.post('/', devolucionesController.create);

// GET /api/devoluciones/venta/:ventaId - Obtener devoluciones por venta
router.get('/venta/:ventaId', devolucionesController.getByVenta);

// GET /api/devoluciones/producto/:productoId - Obtener devoluciones por producto
router.get('/producto/:productoId', devolucionesController.getByProducto);

module.exports = router;