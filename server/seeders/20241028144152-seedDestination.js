'use strict';

let destination = require('../data/destination.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    destination.forEach(el => {
      delete el.id
      el.updatedAt = el.createdAt = new Date()
      
      return el
    })

    await queryInterface.bulkInsert('Destinations', destination, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Destinations', null, {})
  }
};
