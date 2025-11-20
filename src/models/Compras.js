const prisma = require('../config/database');

const Compras = {
  getAll: async () => {
    return await prisma.compras.findMany({
      where: { Estado: true },
      include: {
        Proveedor: true,
        DetalleCompras: {
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
    return await prisma.compras.findUnique({
      where: { IdCompra: parseInt(id), Estado: true },
      include: {
        Proveedor: true,
        DetalleCompras: {
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

  create: async (compraData) => {
    const { IdProveedor, productos } = compraData;
    
    return await prisma.$transaction(async (prisma) => {
      const compra = await prisma.compras.create({
        data: {
          IdProveedor: parseInt(IdProveedor),
          Total: 0,
          Estado: true
        }
      });

      let totalCompra = 0;

      for (const producto of productos) {
        const subtotal = producto.Precio * producto.Cantidad;
        totalCompra += subtotal;

        await prisma.detalleCompras.create({
          data: {
            IdCompra: compra.IdCompra,
            IdProducto: parseInt(producto.IdProducto),
            Cantidad: producto.Cantidad,
            Precio: producto.Precio,
            Subtotal: subtotal
          }
        });

        await prisma.productos.update({
          where: { IdProducto: parseInt(producto.IdProducto) },
          data: {
            Stock: { increment: producto.Cantidad },
            Precio: producto.Precio
          }
        });
      }

      return await prisma.compras.update({
        where: { IdCompra: compra.IdCompra },
        data: { Total: totalCompra },
        include: {
          Proveedor: true,
          DetalleCompras: {
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

  getByProveedor: async (proveedorId) => {
    return await prisma.compras.findMany({
      where: { IdProveedor: parseInt(proveedorId), Estado: true },
      include: { Proveedor: true }
    });
  },

  updateEstado: async (id, estado) => {
    return await prisma.compras.update({
      where: { IdCompra: parseInt(id) },
      data: { Estado: estado }
    });
  }
};

module.exports = Compras; 