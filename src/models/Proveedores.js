const prisma = require('../config/database');

const Proveedores = {
  getAll: async () => {
    return await prisma.proveedores.findMany({
      where: { Estado: true }
    });
  },

  getById: async (id) => {
    return await prisma.proveedores.findUnique({
      where: { IdProveedor: parseInt(id), Estado: true }
    });
  },

  create: async (proveedorData) => {
    return await prisma.proveedores.create({
      data: { ...proveedorData, Estado: true }
    });
  },

  update: async (id, proveedorData) => {
    return await prisma.proveedores.update({
      where: { IdProveedor: parseInt(id) },
      data: proveedorData
    });
  },

  delete: async (id) => {
    return await prisma.proveedores.update({
      where: { IdProveedor: parseInt(id) },
      data: { Estado: false }
    });
  },

  getByDocumento: async (numeroDocumento) => {
    return await prisma.proveedores.findFirst({
      where: { NumeroDocumento: numeroDocumento, Estado: true }
    });
  }
};

module.exports = Proveedores;