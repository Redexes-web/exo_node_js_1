'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		//vider la table
		await queryInterface.bulkDelete('Woods', null, {});
		await queryInterface.removeColumn('Woods', 'hardness');
		await queryInterface.removeColumn('Woods', 'type');
		await queryInterface.addColumn('Woods', 'hardnessId', {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'Hardness',
				key: 'id',
			},
		});
		await queryInterface.addColumn('Woods', 'typeId', {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: 'WoodTypes',
				key: 'id',
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn('Woods', 'hardnessId');
		await queryInterface.removeColumn('Woods', 'typeId');
		await queryInterface.addColumn('Woods', 'hardness', {
			type: Sequelize.ENUM('tender', 'medium-hard', 'hard'),
			allowNull: false,
		});
		await queryInterface.addColumn('Woods', 'type', {
			type: Sequelize.ENUM('softwood', 'exotic wood', 'noble and hardwoods'),
			allowNull: false,
		});
	},
};
