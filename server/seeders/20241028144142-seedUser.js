'use strict';
const { hash } = require('../helpers/bcrypt');
let user = require('../data/user.json')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    user.forEach(el => {
      delete el.id
      el.password = hash(el.password)
      el.updatedAt = el.createdAt = new Date()

      return el
    })

    await queryInterface.bulkInsert('Users', user, {})
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
