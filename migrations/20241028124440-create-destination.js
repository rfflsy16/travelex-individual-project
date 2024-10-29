'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Destinations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'name is required'
          },
          notEmpty: {
            msg: 'name is required'
          }
        }
      },
      location: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notNull: {
            msg: 'location is required'
          },
          notEmpty: {
            msg: 'location is required'
          }
        }
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
          notNull: {
            msg: 'description is required'
          },
          notEmpty: {
            msg: 'description is required'
          }
        }
      },
      rating: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Destinations');
  }
};