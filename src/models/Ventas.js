const prisma = require('../config/database');

const Ventas = {
  getAll: async () => {
    return await prisma.ventas.findMany({
      include: {
        Cliente: true,
        Estado: true,
        DetalleVentas: {
          include: {
            Producto: {
              include: {
                Categoria: true,
                Talla: true
              }
            }
          }
        }
      },
      orderBy: { Fecha: 'desc' }
    });
  },

  getById: async (id) => {
    return await prisma.ventas.findUnique({
      where: { IdVenta: parseInt(id) },
      include: {
        Cliente: true,
        Estado: true,
        DetalleVentas: {
          include: {
            Producto: {
              include: {
                Categoria: true,
                Talla: true
              }
            }
          }
        }
      }
    });
  },

  create: async (ventaData) => {
    const { IdCliente, productos } = ventaData;
    
    return await prisma.$transaction(async (prisma) => {
      const venta = await prisma.ventas.create({
        data: {
          IdCliente: parseInt(IdCliente),
          IdEstado: 1,
          Total: 0
        }
      });

      let totalVenta = 0;

      for (const producto of productos) {
        const productoDB = await prisma.productos.findUnique({
          where: { IdProducto: parseInt(producto.IdProducto) }
        });

        if (!productoDB) {
          throw new Error(`Producto ${producto.IdProducto} no encontrado`);
        }

        if (productoDB.Stock < producto.Cantidad) {
          throw new Error(`Stock insuficiente para ${productoDB.Nombre}`);
        }

        const subtotal = productoDB.Precio * producto.Cantidad;
        totalVenta += subtotal;

        await prisma.detalleVentas.create({
          data: {
            IdVenta: venta.IdVenta,
            IdProducto: parseInt(producto.IdProducto),
            Cantidad: producto.Cantidad,
            Precio: productoDB.Precio,
            Subtotal: subtotal
          }
        });

        await prisma.productos.update({
          where: { IdProducto: parseInt(producto.IdProducto) },
          data: { Stock: { decrement: producto.Cantidad } }
        });
      }

      return await prisma.ventas.update({
        where: { IdVenta: venta.IdVenta },
        data: { Total: totalVenta },
        include: {
          Cliente: true,
          Estado: true,
          DetalleVentas: {
            include: {
              Producto: {
                include: {
                  Categoria: true,
                  Talla: true
                }
              }
            }
          }
        }
      });
    });
  },

  updateEstado: async (id, IdEstado) => {
    return await prisma.ventas.update({
      where: { IdVenta: parseInt(id) },
      data: { IdEstado: parseInt(IdEstado) },
      include: {
        Cliente: true,
        Estado: true
      }
    });
  },

  getByCliente: async (clienteId) => {
    return await prisma.ventas.findMany({
      where: { IdCliente: parseInt(clienteId) },
      include: {
        Cliente: true,
        Estado: true
      }
    });
  }
};

module.exports = Ventas;