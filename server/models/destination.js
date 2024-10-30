'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Destination.hasMany(models.Wishlist, { foreignKey: 'destination_id' })
    }
  }
  Destination.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.TEXT,
      validate: {
        notNull: {
          msg: 'description is required'
        },
        notEmpty: {
          msg: 'description is required'
        }
      }
    },
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Destination',
  });
  return Destination;
};