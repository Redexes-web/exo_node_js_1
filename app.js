const express = require('express');
const router = require('./App/routes/index');
const app = express();
const db = require('./App/models/index.js');
const path = require('path');
const cors = require('cors');
db.sequelize
	.authenticate()
	.then(() => console.log('Database connected ...'))
	.catch((err) => console.log(err));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const corsOptions = {
    origin: 'http://localhost:8080',
  };
  app.use(cors(corsOptions));
//Ajout des routes
app.use('/api', router);
module.exports = app;
