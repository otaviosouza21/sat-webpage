'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('tipos_formulario', {
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

    // 2. Adição da coluna 'tipo_id' na tabela 'formularios'
    await queryInterface.addColumn('formularios', 'tipo_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'tipos_formulario',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    // 3. Remoção da coluna 'tipo' da tabela 'formularios'
    await queryInterface.removeColumn('formularios', 'tipo');
  },

  down: async (queryInterface, Sequelize) => {
    // 1. Recriação da coluna 'tipo' na tabela 'formularios'
    await queryInterface.addColumn('formularios', 'tipo', {
      type: Sequelize.STRING,
      allowNull: true
    });

    // 2. Remoção da coluna 'tipo_id' na tabela 'formularios'
    await queryInterface.removeColumn('formularios', 'tipo_id');

    // 3. Exclusão da tabela 'tipos'
    await queryInterface.dropTable('tipos_formulario');
  }
};
