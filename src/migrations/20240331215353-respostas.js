'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('respostas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'usuarios', key: 'id' }
      },
      pergunta_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'perguntas', key: 'id' }
      },
      resposta_texto: {
        type: Sequelize.STRING,
        allowNull: true // Usado apenas para respostas de texto.
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
    await queryInterface.dropTable('respostas');
  }
};
