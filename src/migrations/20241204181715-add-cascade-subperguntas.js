'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Remover a FK existente
    await queryInterface.removeConstraint('sub_perguntas', 'sub_perguntas_ibfk_1'); // Nome pode variar; ajuste conforme seu banco

    // Adicionar a FK com onDelete: CASCADE
    await queryInterface.addConstraint('sub_perguntas', {
      fields: ['pergunta_id'],
      type: 'foreign key',
      name: 'sub_perguntas_ibfk_1', // Nome da constraint
      references: {
        table: 'perguntas',
        field: 'id',
      },
      onDelete: 'CASCADE', // Define exclusão em cascata
    });
  },

  async down(queryInterface, Sequelize) {
    // Remover a FK com onDelete: CASCADE
    await queryInterface.removeConstraint('sub_perguntas', 'sub_perguntas_ibfk_1');

    // Adicionar a FK sem onDelete: CASCADE (reverter para o estado anterior)
    await queryInterface.addConstraint('perguntas', {
      fields: ['pergunta_id'],
      type: 'foreign key',
      name: 'sub_perguntas_ibfk_1', // Nome da constraint
      references: {
        table: 'perguntas',
        field: 'id',
      },
    });
  },
};
