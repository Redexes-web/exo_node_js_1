'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface) => {
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

	down: async (queryInterface) => {
		return queryInterface.bulkDelete('WoodTypes', null, {});
	},
};
