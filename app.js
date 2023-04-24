const express = require('express');
const router = require('./App/routes/index');
const app = express();
const db = require('./App/models/index.js');
db.sequelize
	.authenticate()
	.then(() => console.log('Database connected ...'))
	.catch((err) => console.log(err));
//Ajout des routes
app.use('/api', router);
module.exports = app;
