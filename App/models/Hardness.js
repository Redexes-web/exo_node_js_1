'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Hardness extends Model {
		static associate(models) {
			Hardness.hasMany(models.Wood, {
				foreignKey: 'hardnessId',
			});
		}
	}
	Hardness.init(
		{
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Hardness',
		}
	);
	return Hardness;
};
