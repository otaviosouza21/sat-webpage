'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('usuarios','email',{
      type: Sequelize.STRING,
      allowNull:false,
    });

    await queryInterface.addColumn('usuarios','senha',{
      type: Sequelize.STRING,
      allowNull:false,
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('usuarios','email')
    
  }
};
