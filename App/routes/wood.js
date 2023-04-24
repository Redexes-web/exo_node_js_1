const express = require('express');
const router = express();

const woodCtrl = require('../controllers/wood.js');
router.get('/', woodCtrl.getAllWoods);

module.exports = router;
