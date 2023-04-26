'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('WoodTypes', [
			{
				name: 'softwood',
			},
			{
				name: 'noble and hardwood',
			},
			{
				name: 'exotic wood',
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('WoodTypes', null, {});
	},
};
