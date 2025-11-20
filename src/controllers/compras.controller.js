const { Compras } = require('../models');

const comprasController = {
  getAll: async (req, res) => {
    try {
      const compras = await Compras.getAll();
      res.json({ success: true, data: compras });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener compras', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const compra = await Compras.getById(id);
      if (!compra) return res.status(404).json({ success: false, message: 'Compra no encontrada' });
      res.json({ success: true, data: compra });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener compra', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const compra = await Compras.create(req.body);
      res.status(201).json({ success: true, message: 'Compra registrada exitosamente', data: compra });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al registrar compra', error: error.message });
    }
  }
};

module.exports = comprasController;