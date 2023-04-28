require('dotenv').config();
const process = require('process');
module.exports = {
	development: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_DEV_NAME,
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT),
		dialect: 'mysql',
	},
	test: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_TEST_NAME,
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT),
		dialect: 'mysql',
	},
	production: {
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_PROD_NAME,
		host: process.env.DB_HOST,
		port: parseInt(process.env.DB_PORT),
		dialect: 'mysql',
	},
};
