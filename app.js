const express = require('express');
const router = require('./App/routes/index');
const app = express();
const db = require('./App/models/index.js');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const fs = require('fs');
db.sequelize
	.authenticate()
	.then(() => console.log('Database connected ...'))
	.catch((err) => console.log(err));
//Ajout de swagger
const swaggerDocument = require('./swagger.json');
// Définir le chemin du fichier de logs
const logFilePath = './logs.log';

// Ouvrir le fichier en mode append
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

// Configurer le middleware de journalisation
app.use(morgan('combined', { stream: logStream }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Ajout des routes
app.use('/api', router);
module.exports = app;
