'use strict';
const { Model } = require('sequelize');
const { isEmail } = require('validator');
const CryptoJS = require('crypto-js');
const { encryptEmail, decryptEmail } = require('../utils/crypto.js');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			// define association here
		}
		static findOneByEmail = async (email) => {
      
      const encryptedEmail = encryptEmail(email);
      console.log(encryptedEmail);
      
      const users = await User.findAll();
      const user = users.find((user) => {
        const decryptedEmail = decryptEmail(user.email);
        console.error(encryptedEmail== user.email ? "true" : "false");
        console.log(decryptedEmail, email);
        return decryptedEmail === email;
      });
			return user;
		};
	}
	User.init(
		{
			firstName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Le prénom ne peut pas être vide',
					},
				},
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Le nom de famille ne peut pas être vide',
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notNull: {
						msg: "L'email ne peut pas être vide",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: 'Le mot de passe ne peut pas être vide',
					},
				},
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
	return User;
};
