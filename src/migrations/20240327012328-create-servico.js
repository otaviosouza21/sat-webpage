'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('servicos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      possui_nome_negocio: {
        type: Sequelize.BOOLEAN
      },
      nome_negocio: {
        type: Sequelize.STRING
      },
      tempo_negocio: {
        type: Sequelize.INTEGER
      },
      descricao_servico: {
        type: Sequelize.STRING
      },
      status:{
        type: Sequelize.BOOLEAN
      },
      usuario_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references:{model:'usuarios', key:'id'}
      },
      categoria_id:{
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {model:'categoria_servicos', key:'id'}
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
    await queryInterface.dropTable('servicos');
  }
};