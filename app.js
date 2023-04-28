const express = require('express');
const router = require('./App/routes/index');
const app = express();
const db = require('./App/models/index.js');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const morgan = require('morgan');
const fs = require('fs');
const helmet = require('helmet');
db.sequelize
	.authenticate()
	.then(() => console.log('Database connected ...'))
	.catch((err) => console.log(err));

const swaggerDocument = require('./swagger.json');
const logFilePath = './logs.log';

const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

app.use(helmet());
app.use(morgan('combined', { stream: logStream }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Ajout des routes
app.use('/api', router);
module.exports = app;
