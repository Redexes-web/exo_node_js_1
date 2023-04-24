const express = require('express');
const router = express();

router.post('/signup', function (req, res) {
	res.send('You are signup');
});
router.post('/login', function (req, res) {
	res.send('You are login');
});

module.exports = router;
