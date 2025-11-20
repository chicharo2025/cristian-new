const prisma = require('../config/database');

const Productos = {
  getAll: async () => {
    return await prisma.productos.findMany({
      where: { Estado: true },
      include: { Categoria: true, Talla: true }
    });
  },

  getById: async (id) => {
    return await prisma.productos.findUnique({
      where: { IdProducto: parseInt(id), Estado: true },
      include: { Categoria: true, Talla: true }
    });
  },

  create: async (productoData) => {
    return await prisma.productos.create({
      data: { ...productoData, Estado: true },
      include: { Categoria: true, Talla: true }
    });
  },

  update: async (id, productoData) => {
    return await prisma.productos.update({
      where: { IdProducto: parseInt(id) },
      data: productoData,
      include: { Categoria: true, Talla: true }
    });
  },

  delete: async (id) => {
    return await prisma.productos.update({
      where: { IdProducto: parseInt(id) },
      data: { Estado: false }
    });
  },

  getByCategoria: async (categoriaId) => {
    return await prisma.productos.findMany({
      where: { IdCategoria: parseInt(categoriaId), Estado: true },
      include: { Categoria: true, Talla: true }
    });
  },

  getByTalla: async (tallaId) => {
    return await prisma.productos.findMany({
      where: { IdTallas: parseInt(tallaId), Estado: true },
      include: { Categoria: true, Talla: true }
    });
  }
};

module.exports = Productos;