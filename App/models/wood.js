'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Wood extends Model {
		static associate(models) {
			Wood.belongsTo(models.WoodType, {
				foreignKey: 'typeId',
			});
			Wood.belongsTo(models.Hardness, {
				foreignKey: 'hardnessId',
			});
		}
	}
	Wood.init(
		{
			name: DataTypes.STRING,
			image: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'Wood',
		}
	);
	return Wood;
};
