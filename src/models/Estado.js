const prisma = require('../config/database');

const Estado = {
  getAll: async () => {
    return await prisma.estado.findMany({
      where: { Estado: true }
    });
  },

  getById: async (id) => {
    return await prisma.estado.findUnique({
      where: { IdEstado: parseInt(id), Estado: true }
    });
  },

  create: async (estadoData) => {
    return await prisma.estado.create({
      data: { ...estadoData, Estado: true }
    });
  },

  update: async (id, estadoData) => {
    return await prisma.estado.update({
      where: { IdEstado: parseInt(id) },
      data: estadoData
    });
  },

  delete: async (id) => {
    return await prisma.estado.update({
      where: { IdEstado: parseInt(id) },
      data: { Estado: false }
    });
  }
};

module.exports = Estado;