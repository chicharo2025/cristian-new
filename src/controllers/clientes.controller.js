const { Clientes } = require('../models');

const clientesController = {
  getAll: async (req, res) => {
    try {
      const clientes = await Clientes.getAll();
      res.json({ success: true, data: clientes });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener clientes', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Clientes.getById(id);
      if (!cliente) return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
      res.json({ success: true, data: cliente });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener cliente', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const cliente = await Clientes.create(req.body);
      res.status(201).json({ success: true, message: 'Cliente creado exitosamente', data: cliente });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear cliente', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Clientes.update(id, req.body);
      if (!cliente) return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
      res.json({ success: true, message: 'Cliente actualizado exitosamente', data: cliente });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar cliente', error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Clientes.delete(id);
      if (!cliente) return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
      res.json({ success: true, message: 'Cliente eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar cliente', error: error.message });
    }
  }
};

module.exports = clientesController;