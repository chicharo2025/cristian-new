const prisma = require('../config/database');

const DetalleCompras = {
  getAll: async () => {
    return await prisma.detalleCompras.findMany({
      include: {
        Compra: {
          include: { Proveedor: true }
        },
        Producto: {
          include: { Categoria: true, Talla: true }
        }
      }
    });
  },

  getById: async (id) => {
    return await prisma.detalleCompras.findUnique({
      where: { IdDetalleCompra: parseInt(id) },
      include: {
        Compra: {
          include: { Proveedor: true }
        },
        Producto: {
          include: { Categoria: true, Talla: true }
        }
      }
    });
  },

  getByCompraId: async (compraId) => {
    return await prisma.detalleCompras.findMany({
      where: { IdCompra: parseInt(compraId) },
      include: {
        Producto: {
          include: { Categoria: true, Talla: true }
        }
      }
    });
  },

  create: async (detalleData) => {
    return await prisma.detalleCompras.create({
      data: {
        IdCompra: parseInt(detalleData.IdCompra),
        IdProducto: parseInt(detalleData.IdProducto),
        Cantidad: detalleData.Cantidad,
        Precio: detalleData.Precio,
        Subtotal: detalleData.Precio * detalleData.Cantidad
      },
      include: {
        Compra: true,
        Producto: true
      }
    });
  },

  update: async (id, detalleData) => {
    return await prisma.detalleCompras.update({
      where: { IdDetalleCompra: parseInt(id) },
      data: {
        ...detalleData,
        Subtotal: detalleData.Precio * detalleData.Cantidad
      },
      include: {
        Compra: true,
        Producto: true
      }
    });
  },

  delete: async (id) => {
    return await prisma.detalleCompras.delete({
      where: { IdDetalleCompra: parseInt(id) }
    });
  }
};

module.exports = DetalleCompras;