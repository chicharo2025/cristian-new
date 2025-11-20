const prisma = require('../config/database');

const Permisos = {
  getAll: async () => {
    return await prisma.permisos.findMany({
      include: {
        DetallePermisos: {
          include: { Rol: true }
        }
      }
    });
  },

  getById: async (id) => {
    return await prisma.permisos.findUnique({
      where: { IdPermiso: id }
    });
  },

  create: async (permisoData) => {
    return await prisma.permisos.create({
      data: permisoData
    });
  },

  update: async (id, permisoData) => {
    return await prisma.permisos.update({
      where: { IdPermiso: id },
      data: permisoData
    });
  },

  delete: async (id) => {
    return await prisma.permisos.delete({
      where: { IdPermiso: id }
    });
  }
};

module.exports = Permisos;