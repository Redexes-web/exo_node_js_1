'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn('Woods', 'image', {
			type: Sequelize.STRING,
			allowNull: true, // Spécification que la colonne peut être nulle
		});
	},

	down: async (queryInterface) => {
		await queryInterface.removeColumn('Woods', 'image');
	},
};
