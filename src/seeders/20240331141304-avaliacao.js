'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('avaliacao_servicos', [{
        avaliacao: 5,
        comentario: 'Exelente profissional! Muito organizada',
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
  },
  async down (queryInterface, Sequelize) {
 

  await queryInterface.bulkDelete('avaliacao_servicos', null, {});}
};
