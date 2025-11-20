const prisma = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuarios = {
  getAll: async () => {
    return await prisma.usuarios.findMany({
      where: { Estado: true },
      include: { Rol: true }
    });
  },

  getById: async (id) => {
    return await prisma.usuarios.findUnique({
      where: { IdUsuario: parseInt(id), Estado: true },
      include: { Rol: true }
    });
  },

  create: async (usuarioData) => {
    const hashedPassword = await bcrypt.hash(usuarioData.Clave, 10);
    
    return await prisma.usuarios.create({
      data: {
        ...usuarioData,
        Clave: hashedPassword,
        Estado: true
      },
      include: { Rol: true }
    });
  },

  update: async (id, usuarioData) => {
    if (usuarioData.Clave) {
      usuarioData.Clave = await bcrypt.hash(usuarioData.Clave, 10);
    }
    
    return await prisma.usuarios.update({
      where: { IdUsuario: parseInt(id) },
      data: usuarioData,
      include: { Rol: true }
    });
  },

  delete: async (id) => {
    return await prisma.usuarios.update({
      where: { IdUsuario: parseInt(id) },
      data: { Estado: false }
    });
  },

  login: async (Correo, Clave) => {
    const usuario = await prisma.usuarios.findUnique({
      where: { Correo, Estado: true },
      include: { Rol: true }
    });

    if (!usuario) {
      return null;
    }

    const isValid = await bcrypt.compare(Clave, usuario.Clave);
    return isValid ? usuario : null;
  }
};

module.exports = Usuarios;