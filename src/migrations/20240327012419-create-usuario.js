'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      contato_pessoal_01: {
        type: Sequelize.STRING
      },
      contato_pessoal_02: {
        type: Sequelize.STRING
      },
      contato_negocio_01: {
        type: Sequelize.STRING
      },
      contato_negocio_02: {
        type: Sequelize.STRING
      },
      tempo_reside: {
        type: Sequelize.INTEGER
      },
      socio_sat: {
        type: Sequelize.BOOLEAN
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};