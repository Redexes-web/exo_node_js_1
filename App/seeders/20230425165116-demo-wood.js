'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Get hardness and wood types data
		const [hardnessData, woodTypesData] = await Promise.all([
			queryInterface.sequelize.query('SELECT id, name FROM Hardness'),
			queryInterface.sequelize.query('SELECT id, name FROM WoodTypes'),
		]);
		const hardnessMap = new Map(hardnessData[0].map((h) => [h.name, h.id]));
		const woodTypesMap = new Map(woodTypesData[0].map((t) => [t.name, t.id]));
		console.log(hardnessMap.get('tender'));
		console.log(woodTypesMap.get('softwood'));
		console.log(hardnessMap.get('medium-hard'));
		console.log(woodTypesMap.get('exotic wood'));
		console.log(hardnessMap.get('hard'));
		console.log(woodTypesMap.get('noble and hardwood'));

		await queryInterface.bulkInsert('Woods', [
			{
				name: 'Épicéa',
				typeId: woodTypesMap.get('softwood'),
				hardnessId: hardnessMap.get('tender'),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Pin',
				typeId: woodTypesMap.get('softwood'),
				hardnessId: hardnessMap.get('medium-hard'),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Padouk',
				typeId: woodTypesMap.get('exotic wood'),
				hardnessId: hardnessMap.get('hard'),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Érable',
				typeId: woodTypesMap.get('noble and hardwood'),
				hardnessId: hardnessMap.get('medium-hard'),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Hêtre',
				typeId: woodTypesMap.get('noble and hardwood'),
				hardnessId: hardnessMap.get('medium-hard'),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Itauba',
				typeId: woodTypesMap.get('exotic wood'),
				hardnessId: hardnessMap.get('hard'),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				name: 'Douglas',
				typeId: woodTypesMap.get('softwood'),
				hardnessId: hardnessMap.get('tender'),
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('Woods', null, {});
	},
};
