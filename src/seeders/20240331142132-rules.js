'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('rules', [{
      nome: 'normal',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
},
  async down (queryInterface, Sequelize) {

    await queryInterface.bulkDelete('rules', null, {});

  }
};