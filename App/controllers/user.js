const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const { encryptEmail, decryptEmail } = require('../utils/crypto');

exports.signup = async (req, res) => {
	try {
		const user = await User.create({
			...req.body,
			email: encryptEmail(req.body.email),
			password: await bcrypt.hash(req.body.password, 10),
		});
		res.status(201).json({
			...user.dataValues,
			email: req.body.email,
			password: undefined,
			createdAt: undefined,
			updatedAt: undefined,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Error create user');
	}
};

exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// Find user in database using decrypted email
		const user = await User.findOneByEmail(email);

		if (!user) {
			return res.status(401).json({ error: 'User Not found' });
		}

		// Compare passwords
		const passwordVerify = await bcrypt.compare(password, user.password);

		if (!passwordVerify) {
			return res.status(401).json({ error: 'User Not found' });
		}

		// Generate JWT token
		const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, {
			expiresIn: '24h',
		});

		res.json({
			user: {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: decryptEmail(user.email),
			},
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Error Authenticating User');
	}
};
