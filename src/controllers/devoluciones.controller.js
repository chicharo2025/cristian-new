const { Devoluciones } = require('../models');

const devolucionesController = {
  getAll: async (req, res) => {
    try {
      const devoluciones = await Devoluciones.getAll();
      res.json({ success: true, data: devoluciones });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener devoluciones', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const devolucion = await Devoluciones.getById(id);
      if (!devolucion) return res.status(404).json({ success: false, message: 'Devolución no encontrada' });
      res.json({ success: true, data: devolucion });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener devolución', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const devolucion = await Devoluciones.create(req.body);
      res.status(201).json({ success: true, message: 'Devolución registrada exitosamente', data: devolucion });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al registrar devolución', error: error.message });
    }
  },

  getByVenta: async (req, res) => {
    try {
      const { ventaId } = req.params;
      const devoluciones = await Devoluciones.getByVenta(ventaId);
      res.json({ success: true, data: devoluciones });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener devoluciones por venta', error: error.message });
    }
  },

  getByProducto: async (req, res) => {
    try {
      const { productoId } = req.params;
      const devoluciones = await Devoluciones.getByProducto(productoId);
      res.json({ success: true, data: devoluciones });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener devoluciones por producto', error: error.message });
    }
  }
};

module.exports = devolucionesController;