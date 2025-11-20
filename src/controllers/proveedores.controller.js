const { Proveedores } = require('../models');

const proveedoresController = {
  getAll: async (req, res) => {
    try {
      const proveedores = await Proveedores.getAll();
      res.json({ success: true, data: proveedores });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener proveedores', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const proveedor = await Proveedores.getById(id);
      if (!proveedor) return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
      res.json({ success: true, data: proveedor });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener proveedor', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const proveedor = await Proveedores.create(req.body);
      res.status(201).json({ success: true, message: 'Proveedor creado exitosamente', data: proveedor });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear proveedor', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const proveedor = await Proveedores.update(id, req.body);
      if (!proveedor) return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
      res.json({ success: true, message: 'Proveedor actualizado exitosamente', data: proveedor });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar proveedor', error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const proveedor = await Proveedores.delete(id);
      if (!proveedor) return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
      res.json({ success: true, message: 'Proveedor eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar proveedor', error: error.message });
    }
  },

  getByDocumento: async (req, res) => {
    try {
      const { numero } = req.params;
      const proveedor = await Proveedores.getByDocumento(numero);
      if (!proveedor) return res.status(404).json({ success: false, message: 'Proveedor no encontrado' });
      res.json({ success: true, data: proveedor });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al buscar proveedor', error: error.message });
    }
  }
};

module.exports = proveedoresController;