const prisma = require('../config/database');

const Roles = {
  getAll: async () => {
    return await prisma.roles.findMany({
      where: { Estado: true }
    });
  },

  getById: async (id) => {
    return await prisma.roles.findUnique({
      where: { IdRol: parseInt(id), Estado: true }
    });
  },

  create: async (rolData) => {
    return await prisma.roles.create({
      data: {
        ...rolData,
        Estado: true
      }
    });
  },

  update: async (id, rolData) => {
    return await prisma.roles.update({
      where: { IdRol: parseInt(id) },
      data: rolData
    });
  },

  delete: async (id) => {
    return await prisma.roles.update({
      where: { IdRol: parseInt(id) },
      data: { Estado: false }
    });
  }
};

module.exports = Roles;