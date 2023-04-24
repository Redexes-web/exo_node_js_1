'use strict';
const { Model } = require('sequelize');
const { isEmail } = require('validator');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false, 
      validate: {
        notNull: {
          msg: "Le prénom ne peut pas être vide"
        }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,  
      validate: {
        notNull: {
          msg: "Le nom de famille ne peut pas être vide"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, 
      unique: true, 
      validate: {
        notNull: {
          msg: "L'email ne peut pas être vide"
        },
        isEmail: {
          msg: "L'email doit être au bon format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Le mot de passe ne peut pas être vide"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};