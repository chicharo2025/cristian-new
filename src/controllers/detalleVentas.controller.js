const { DetalleVentas } = require('../models');

const detalleVentasController = {
  getAll: async (req, res) => {
    try {
      const detalles = await DetalleVentas.getAll();
      res.json({ success: true, data: detalles });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener detalles de ventas', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const detalle = await DetalleVentas.getById(id);
      if (!detalle) return res.status(404).json({ success: false, message: 'Detalle de venta no encontrado' });
      res.json({ success: true, data: detalle });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener detalle de venta', error: error.message });
    }
  },

  getByVentaId: async (req, res) => {
    try {
      const { ventaId } = req.params;
      const detalles = await DetalleVentas.getByVentaId(ventaId);
      res.json({ success: true, data: detalles });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener detalles de la venta', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const detalle = await DetalleVentas.create(req.body);
      res.status(201).json({ success: true, message: 'Detalle de venta creado exitosamente', data: detalle });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear detalle de venta', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const detalle = await DetalleVentas.update(id, req.body);
      if (!detalle) return res.status(404).json({ success: false, message: 'Detalle de venta no encontrado' });
      res.json({ success: true, message: 'Detalle de venta actualizado exitosamente', data: detalle });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar detalle de venta', error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const detalle = await DetalleVentas.delete(id);
      if (!detalle) return res.status(404).json({ success: false, message: 'Detalle de venta no encontrado' });
      res.json({ success: true, message: 'Detalle de venta eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar detalle de venta', error: error.message });
    }
  }
};

module.exports = detalleVentasController;