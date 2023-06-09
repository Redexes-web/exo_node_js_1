'use strict';
//importer bcrypt pour crypter le mot de passe
const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
    const password = '123456';
		const hashedPassword = await bcrypt.hash(password, 10);
		await queryInterface.bulkInsert(
			'Users',
			[
				{
					firstname: 'John',
					lastname: 'Doe',
					email: 'john.doe@mail.com',
					password: hashedPassword,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('Users', null, {});
	},
};
