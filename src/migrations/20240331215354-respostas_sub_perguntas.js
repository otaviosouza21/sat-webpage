'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('respostas_sub_perguntas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      resposta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'respostas', key: 'id' }
      },
      sub_pergunta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'sub_perguntas', key: 'id' }
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
    await queryInterface.dropTable('respostas_sub_perguntas');
  }
};
