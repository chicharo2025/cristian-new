const prisma = require('../config/database');

const DetalleVentas = {
  getAll: async () => {
    return await prisma.detalleVentas.findMany({
      include: {
        Venta: {
          include: { Cliente: true, Estado: true }
        },
        Producto: {
          include: { Categoria: true, Talla: true }
        }
      }
    });
  },

  getById: async (id) => {
    return await prisma.detalleVentas.findUnique({
      where: { IdDetalleVenta: parseInt(id) },
      include: {
        Venta: {
          include: { Cliente: true, Estado: true }
        },
        Producto: {
          include: { Categoria: true, Talla: true }
        }
      }
    });
  },

  getByVentaId: async (ventaId) => {
    return await prisma.detalleVentas.findMany({
      where: { IdVenta: parseInt(ventaId) },
      include: {
        Producto: {
          include: { Categoria: true, Talla: true }
        }
      }
    });
  },

  create: async (detalleData) => {
    const producto = await prisma.productos.findUnique({
      where: { IdProducto: parseInt(detalleData.IdProducto) }
    });

    if (!producto) {
      throw new Error('Producto no encontrado');
    }

    const subtotal = producto.Precio * detalleData.Cantidad;

    return await prisma.detalleVentas.create({
      data: {
        IdVenta: parseInt(detalleData.IdVenta),
        IdProducto: parseInt(detalleData.IdProducto),
        Cantidad: detalleData.Cantidad,
        Precio: producto.Precio,
        Subtotal: subtotal
      },
      include: {
        Venta: true,
        Producto: true
      }
    });
  },

  update: async (id, detalleData) => {
    return await prisma.detalleVentas.update({
      where: { IdDetalleVenta: parseInt(id) },
      data: {
        ...detalleData,
        Subtotal: detalleData.Precio * detalleData.Cantidad
      },
      include: {
        Venta: true,
        Producto: true
      }
    });
  },

  delete: async (id) => {
    return await prisma.detalleVentas.delete({
      where: { IdDetalleVenta: parseInt(id) }
    });
  }
};

module.exports = DetalleVentas;