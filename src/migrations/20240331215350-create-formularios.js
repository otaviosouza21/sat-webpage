'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('formularios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.STRING
      },
      status:{
        type: Sequelize.BOOLEAN
      },
      vigencia_inicio: {
       type: Sequelize.DATE
      },
      vigencia_fim: {
        type: Sequelize.DATE
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
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
    await queryInterface.dropTable('formularios');
  }
};
