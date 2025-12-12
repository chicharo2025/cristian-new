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
    const idInt = parseInt(id, 10);
    if (isNaN(idInt)) return null;

    return await prisma.usuarios.findUnique({
      where: { IdUsuario: idInt },
      include: { Rol: true }
    });
  },

  create: async (usuarioData) => {
    const hashedPassword = await bcrypt.hash(usuarioData.Clave, 10);

    return await prisma.usuarios.create({
      data: {
        Nombre: usuarioData.Nombre,
        Correo: usuarioData.Correo,
        Clave: hashedPassword,
        Estado: true,
        IdRol: usuarioData.IdRol
      },
      include: { Rol: true }
    });
  },

  update: async (id, usuarioData) => {
    const idInt = parseInt(id, 10);
    if (isNaN(idInt)) return null;

    if (usuarioData.Clave) {
      usuarioData.Clave = await bcrypt.hash(usuarioData.Clave, 10);
    }

    return await prisma.usuarios.update({
      where: { IdUsuario: idInt },
      data: usuarioData,
      include: { Rol: true }
    });
  },

  // 🔥 ELIMINACIÓN REAL — YA NO SOLO CAMBIA ESTADO
  delete: async (id) => {
    const idInt = parseInt(id, 10);
    if (isNaN(idInt)) return null;

    // Verificar si existe
    const usuario = await prisma.usuarios.findUnique({
      where: { IdUsuario: idInt }
    });

    if (!usuario) return null;

    // Eliminar definitivamente
    await prisma.usuarios.delete({
      where: { IdUsuario: idInt }
    });

    return true;
  },

  login: async (Correo, Clave) => {
    const usuario = await prisma.usuarios.findUnique({
      where: { Correo },
      include: { Rol: true }
    });

    if (!usuario || !usuario.Estado) return null;

    const isValid = await bcrypt.compare(Clave, usuario.Clave);
    return isValid ? usuario : null;
  }
};

module.exports = Usuarios;
