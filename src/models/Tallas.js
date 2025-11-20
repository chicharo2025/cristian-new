const prisma = require('../config/database');

const Tallas = {
  getAll: async () => {
    return await prisma.tallas.findMany();
  },

  getById: async (id) => {
    return await prisma.tallas.findUnique({
      where: { IdTalla: parseInt(id) }
    });
  },

  create: async (tallaData) => {
    return await prisma.tallas.create({
      data: tallaData
    });
  },

  update: async (id, tallaData) => {
    return await prisma.tallas.update({
      where: { IdTalla: parseInt(id) },
      data: tallaData
    });
  },

  delete: async (id) => {
    return await prisma.tallas.delete({
      where: { IdTalla: parseInt(id) }
    });
  }
};

module.exports = Tallas;