'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint("Airports",{
      fields: ['cityId'],
      type: 'foreign key',
      name: 'city_fkey_constraint',
      references: {
        table: 'cities',
        field: 'id'
      },
      onDelete: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeConstraint('Airports', 'city_fkey_constraint');
  }
};
