'use strict';

let wishlist = require('../data/wishlist.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    wishlist.forEach(el => {
      delete el.id
      el.updatedAt = el.createdAt = new Date()

      return el
    })
    await queryInterface.bulkInsert('Wishlists', wishlist, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Wishlists', null, {})
  }
};
