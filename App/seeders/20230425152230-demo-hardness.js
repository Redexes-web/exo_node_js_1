'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface) => {
		return queryInterface.bulkInsert('Hardness', [
			{
				name: 'tender',
			},
			{
				name: 'medium-hard',
			},
			{
				name: 'hard',
			},
		]);
	},

	down: async (queryInterface) => {
		return queryInterface.bulkDelete('Hardness', null, {});
	},
};
