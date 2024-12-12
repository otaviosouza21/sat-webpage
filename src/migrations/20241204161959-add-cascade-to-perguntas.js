'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remover a FK existente
    await queryInterface.removeConstraint('perguntas', 'perguntas_ibfk_1'); // Nome pode variar; ajuste conforme seu banco

    // Adicionar a FK com onDelete: CASCADE
    await queryInterface.addConstraint('perguntas', {
      fields: ['formulario_id'],
      type: 'foreign key',
      name: 'perguntas_ibfk_1', // Nome da constraint
      references: {
        table: 'formularios',
        field: 'id',
      },
      onDelete: 'CASCADE', // Define exclusão em cascata
    });
  },

  async down(queryInterface, Sequelize) {
    // Remover a FK com onDelete: CASCADE
    await queryInterface.removeConstraint('perguntas', 'perguntas_ibfk_1');

    // Adicionar a FK sem onDelete: CASCADE (reverter para o estado anterior)
    await queryInterface.addConstraint('perguntas', {
      fields: ['formulario_id'],
      type: 'foreign key',
      name: 'perguntas_ibfk_1', // Nome da constraint
      references: {
        table: 'formularios',
        field: 'id',
      },
    });
  },
};
