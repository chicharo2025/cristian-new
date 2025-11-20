const { DetallePermisos } = require('../models');

const detallePermisosController = {
  getAll: async (req, res) => {
    try {
      const detalles = await DetallePermisos.getAll();
      res.json({ success: true, data: detalles });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener detalle de permisos', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const detalle = await DetallePermisos.getById(id);
      if (!detalle) return res.status(404).json({ success: false, message: 'Detalle de permiso no encontrado' });
      res.json({ success: true, data: detalle });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener detalle de permiso', error: error.message });
    }
  },

  getByRolId: async (req, res) => {
    try {
      const { rolId } = req.params;
      const detalles = await DetallePermisos.getByRolId(rolId);
      res.json({ success: true, data: detalles });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener permisos del rol', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const detalle = await DetallePermisos.create(req.body);
      res.status(201).json({ success: true, message: 'Permiso asignado al rol exitosamente', data: detalle });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al asignar permiso al rol', error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const detalle = await DetallePermisos.delete(id);
      if (!detalle) return res.status(404).json({ success: false, message: 'Detalle de permiso no encontrado' });
      res.json({ success: true, message: 'Permiso removido del rol exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al remover permiso del rol', error: error.message });
    }
  },

  deleteByRolAndPermiso: async (req, res) => {
    try {
      const { rolId, permisoId } = req.params;
      const detalle = await DetallePermisos.deleteByRolAndPermiso(rolId, permisoId);
      if (!detalle) return res.status(404).json({ success: false, message: 'Relación no encontrada' });
      res.json({ success: true, message: 'Permiso removido del rol exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al remover permiso del rol', error: error.message });
    }
  }
};

module.exports = detallePermisosController;