const { Tallas } = require('../models');

const tallasController = {
  getAll: async (req, res) => {
    try {
      const tallas = await Tallas.getAll();
      res.json({ success: true, data: tallas });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener tallas', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const talla = await Tallas.getById(id);
      if (!talla) return res.status(404).json({ success: false, message: 'Talla no encontrada' });
      res.json({ success: true, data: talla });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener talla', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const talla = await Tallas.create(req.body);
      res.status(201).json({ success: true, message: 'Talla creada exitosamente', data: talla });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear talla', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const talla = await Tallas.update(id, req.body);
      if (!talla) return res.status(404).json({ success: false, message: 'Talla no encontrada' });
      res.json({ success: true, message: 'Talla actualizada exitosamente', data: talla });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar talla', error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const talla = await Tallas.delete(id);
      if (!talla) return res.status(404).json({ success: false, message: 'Talla no encontrada' });
      res.json({ success: true, message: 'Talla eliminada exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar talla', error: error.message });
    }
  }
};

module.exports = tallasController;