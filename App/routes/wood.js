const express = require('express');
const router = express();
const auth = require("../middleware/auth.js")

const woodCtrl = require('../controllers/wood.js');
router.get('/',auth, woodCtrl.getAllWoods);
router.get('/hardness/:hardness',auth, woodCtrl.findByHardness);
module.exports = router;
