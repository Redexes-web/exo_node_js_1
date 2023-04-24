const express = require('express');
const router = express();

const woodCtrl = require('../controllers/wood.js');
router.get('/', woodCtrl.getAllWoods);
router.get('/hardness/:hardness', woodCtrl.findByHardness);
module.exports = router;
