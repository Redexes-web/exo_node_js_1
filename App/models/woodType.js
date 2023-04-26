'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class WoodType extends Model {
		static associate(models) {
			WoodType.hasMany(models.Wood, {
				foreignKey: 'woodTypeId',
			});
		}
	}
	WoodType.init(
		{
			name: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'WoodType',
		}
	);
	return WoodType;
};
