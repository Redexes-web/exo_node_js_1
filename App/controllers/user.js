const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.signup = async (req, res) => {
	try {
		const { password, ...userData } = req.body;

		// Create user in database
		const user = await User.create({
			...req.body,
			password: await bcrypt.hash(req.body.password, 10),
		});

		res.status(201).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error create user');
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ where: { email } });

		if (!user) {
			return res.status(401).json({ error: 'User Not found' });
		}

		const passwordVerify = await bcrypt.compare(password, user.password);

		if (!passwordVerify) {
			return res.status(401).json({ error: 'User sNot Found' });
		}

		const token = jwt.sign({ userId: user.id }, 'secret_key', {
			expiresIn: '24h',
		});

		res.json({
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
			},
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Error Authenticatings User');
	}
};
