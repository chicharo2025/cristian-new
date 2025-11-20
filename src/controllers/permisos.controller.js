const { Permisos } = require('../models');

const permisosController = {
  getAll: async (req, res) => {
    try {
      const permisos = await Permisos.getAll();
      res.json({ success: true, data: permisos });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener permisos', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const permiso = await Permisos.getById(id);
      if (!permiso) return res.status(404).json({ success: false, message: 'Permiso no encontrado' });
      res.json({ success: true, data: permiso });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener permiso', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const permiso = await Permisos.create(req.body);
      res.status(201).json({ success: true, message: 'Permiso creado exitosamente', data: permiso });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear permiso', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const permiso = await Permisos.update(id, req.body);
      if (!permiso) return res.status(404).json({ success: false, message: 'Permiso no encontrado' });
      res.json({ success: true, message: 'Permiso actualizado exitosamente', data: permiso });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar permiso', error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const permiso = await Permisos.delete(id);
      if (!permiso) return res.status(404).json({ success: false, message: 'Permiso no encontrado' });
      res.json({ success: true, message: 'Permiso eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar permiso', error: error.message });
    }
  }
};

module.exports = permisosController;