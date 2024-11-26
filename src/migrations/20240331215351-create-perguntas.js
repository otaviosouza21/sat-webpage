'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('perguntas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      formulario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'formularios', key: 'id' }
      },
      titulo: {
        type: Sequelize.STRING
      },
      descricao: {
        type: Sequelize.STRING
      },
      tipo_resposta: {
        type: Sequelize.STRING
      },
      possui_sub_pergunta: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('perguntas');
  }
};
