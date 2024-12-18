'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Criação da tabela 'tipo_respostas'
    await queryInterface.createTable('tipo_respostas', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // 2. Adição da coluna 'tipo_resposta_id' na tabela 'perguntas'
    await queryInterface.addColumn('perguntas', 'tipo_resposta_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'tipo_respostas',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // 3. Remoção da coluna 'tipo_resposta' da tabela 'perguntas'
    await queryInterface.removeColumn('perguntas', 'tipo_resposta');
  },

  down: async (queryInterface, Sequelize) => {
    // 1. Recriação da coluna 'tipo_resposta' na tabela 'perguntas'
    await queryInterface.addColumn('perguntas', 'tipo_resposta', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // 2. Remoção da coluna 'tipo_resposta_id' na tabela 'perguntas'
    await queryInterface.removeColumn('perguntas', 'tipo_resposta_id');

    // 3. Exclusão da tabela 'tipo_respostas'
    await queryInterface.dropTable('tipo_respostas');
  }
};
