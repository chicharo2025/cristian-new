const prisma = require('../config/database');

const Devoluciones = {
  getAll: async () => {
    return await prisma.devoluciones.findMany({
      include: {
        Producto: {
          include: { Categoria: true, Talla: true }
        },
        Venta: {
          include: { Cliente: true }
        }
      },
      orderBy: { Fecha: 'desc' }
    });
  },

  getById: async (id) => {
    return await prisma.devoluciones.findUnique({
      where: { IdDevolucion: parseInt(id) },
      include: {
        Producto: {
          include: { Categoria: true, Talla: true }
        },
        Venta: {
          include: { Cliente: true }
        }
      }
    });
  },

  create: async (devolucionData) => {
    return await prisma.$transaction(async (prisma) => {
      const devolucion = await prisma.devoluciones.create({
        data: {
          ...devolucionData,
          IdProducto: parseInt(devolucionData.IdProducto),
          IdVenta: parseInt(devolucionData.IdVenta)
        },
        include: {
          Producto: true,
          Venta: true
        }
      });

      await prisma.productos.update({
        where: { IdProducto: parseInt(devolucionData.IdProducto) },
        data: { Stock: { increment: devolucionData.Cantidad } }
      });

      return devolucion;
    });
  },

  getByVenta: async (ventaId) => {
    return await prisma.devoluciones.findMany({
      where: { IdVenta: parseInt(ventaId) },
      include: {
        Producto: {
          include: { Categoria: true, Talla: true }
        }
      }
    });
  },

  getByProducto: async (productoId) => {
    return await prisma.devoluciones.findMany({
      where: { IdProducto: parseInt(productoId) },
      include: {
        Venta: {
          include: { Cliente: true }
        }
      }
    });
  }
};

module.exports = Devoluciones;