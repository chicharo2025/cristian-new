const { DetalleCompras } = require('../models');

const detalleComprasController = {
  getAll: async (req, res) => {
    try {
      const detalles = await DetalleCompras.getAll();
      res.json({ success: true, data: detalles });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener detalles de compras', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const detalle = await DetalleCompras.getById(id);
      if (!detalle) return res.status(404).json({ success: false, message: 'Detalle de compra no encontrado' });
      res.json({ success: true, data: detalle });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener detalle de compra', error: error.message });
    }
  },

  getByCompraId: async (req, res) => {
    try {
      const { compraId } = req.params;
      const detalles = await DetalleCompras.getByCompraId(compraId);
      res.json({ success: true, data: detalles });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener detalles de la compra', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const detalle = await DetalleCompras.create(req.body);
      res.status(201).json({ success: true, message: 'Detalle de compra creado exitosamente', data: detalle });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear detalle de compra', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const detalle = await DetalleCompras.update(id, req.body);
      if (!detalle) return res.status(404).json({ success: false, message: 'Detalle de compra no encontrado' });
      res.json({ success: true, message: 'Detalle de compra actualizado exitosamente', data: detalle });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar detalle de compra', error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const detalle = await DetalleCompras.delete(id);
      if (!detalle) return res.status(404).json({ success: false, message: 'Detalle de compra no encontrado' });
      res.json({ success: true, message: 'Detalle de compra eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar detalle de compra', error: error.message });
    }
  }
};

module.exports = detalleComprasController;