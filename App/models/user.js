'use strict';
const { Model } = require('sequelize');
const { isEmail } = require('validator');

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			// define association here
		}
		static findByEmail = async (email, secretKey) => {
      
			const cipherText = CryptoJS.AES.encrypt(email, secretKey).toString();
			const user = await User.findOne({ where: { email: cipherText } });
			if (user) {
				user.email = CryptoJS.AES.decrypt(user.email, secretKey).toString(
					CryptoJS.enc.Utf8
				);
			}
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
