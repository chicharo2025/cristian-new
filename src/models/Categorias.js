const prisma = require('../config/database');

const Categorias = {
  getAll: async () => {
    return await prisma.categorias.findMany({
      where: { Estado: true }
    });
  },

  getById: async (id) => {
    return await prisma.categorias.findUnique({
      where: { IdCategoria: parseInt(id), Estado: true }
    });
  },

  create: async (categoriaData) => {
    return await prisma.categorias.create({
      data: { ...categoriaData, Estado: true }
    });
  },

  update: async (id, categoriaData) => {
    return await prisma.categorias.update({
      where: { IdCategoria: parseInt(id) },
      data: categoriaData
    });
  },

  delete: async (id) => {
    return await prisma.categorias.update({
      where: { IdCategoria: parseInt(id) },
      data: { Estado: false }
    });
  }
};

module.exports = Categorias;