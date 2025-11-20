const { Usuarios } = require('../models');

const usuariosController = {
  getAll: async (req, res) => {
    try {
      const usuarios = await Usuarios.getAll();
      res.json({ success: true, data: usuarios });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener usuarios', error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuarios.getById(id);
      if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      res.json({ success: true, data: usuario });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al obtener usuario', error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const usuario = await Usuarios.create(req.body);
      res.status(201).json({ success: true, message: 'Usuario creado exitosamente', data: usuario });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al crear usuario', error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuarios.update(id, req.body);
      if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      res.json({ success: true, message: 'Usuario actualizado exitosamente', data: usuario });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al actualizar usuario', error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuarios.delete(id);
      if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
      res.json({ success: true, message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error al eliminar usuario', error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      // Simulación de login para desarrollo
      res.json({ 
        success: true, 
        message: 'Login exitoso (modo desarrollo)',
        token: 'token_simulado',
        usuario: { id: 1, nombre: 'Admin', correo: 'admin@test.com', rol: 1 }
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error en el login', error: error.message });
    }
  }
};

module.exports = usuariosController;