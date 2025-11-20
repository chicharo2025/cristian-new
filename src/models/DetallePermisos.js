const prisma = require('../config/database');

const DetallePermisos = {
  getAll: async () => {
    return await prisma.detallePermisos.findMany({
      include: { Rol: true, Permiso: true }
    });
  },

  getById: async (id) => {
    return await prisma.detallePermisos.findUnique({
      where: { IdDetalle: parseInt(id) },
      include: { Rol: true, Permiso: true }
    });
  },

  getByRolId: async (rolId) => {
    return await prisma.detallePermisos.findMany({
      where: { IdRol: parseInt(rolId) },
      include: { Permiso: true }
    });
  },

  create: async (detalleData) => {
    return await prisma.detallePermisos.create({
      data: {
        IdRol: parseInt(detalleData.IdRol),
        IdPermiso: detalleData.IdPermiso
      },
      include: { Rol: true, Permiso: true }
    });
  },

  delete: async (id) => {
    return await prisma.detallePermisos.delete({
      where: { IdDetalle: parseInt(id) }
    });
  },

  deleteByRolAndPermiso: async (rolId, permisoId) => {
    const detalle = await prisma.detallePermisos.findFirst({
      where: { IdRol: parseInt(rolId), IdPermiso: permisoId }
    });

    if (detalle) {
      return await prisma.detallePermisos.delete({
        where: { IdDetalle: detalle.IdDetalle }
      });
    }

    return null;
  }
};

module.exports = DetallePermisos;