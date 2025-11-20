const prisma = require('../config/database');

const Clientes = {
  getAll: async () => {
    return await prisma.clientes.findMany({
      where: { Estado: true }
    });
  },

  getById: async (id) => {
    return await prisma.clientes.findUnique({
      where: { IdCliente: parseInt(id), Estado: true }
    });
  },

  create: async (clienteData) => {
    return await prisma.clientes.create({
      data: {
        ...clienteData,
        Estado: true,
        SaldoaFavor: clienteData.SaldoaFavor || "0"
      }
    });
  },

  update: async (id, clienteData) => {
    return await prisma.clientes.update({
      where: { IdCliente: parseInt(id) },
      data: clienteData
    });
  },

  delete: async (id) => {
    return await prisma.clientes.update({
      where: { IdCliente: parseInt(id) },
      data: { Estado: false }
    });
  }
};

module.exports = Clientes;