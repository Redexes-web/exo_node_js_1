const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const sequelize = require('sequelize');
exports.signup = async (req, res) => {
	try {
		const user = await User.create({
			...req.body,
			email: sequelize.literal(
				`HEX(AES_ENCRYPT('${req.body.email}', '${process.env.ENCRYPTION_SECRET}'))`
			),
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
		// Find user in database using decrypted email
		const user = await User.findOne({
			where: sequelize.literal(
				`AES_DECRYPT(UNHEX(email), '${process.env.ENCRYPTION_SECRET}') = '${email}'`
			),
			attributes: [
				'firstName',
				'lastName',
				[sequelize.fn('AES_DECRYPT', sequelize.fn('UNHEX', sequelize.col('email')), process.env.ENCRYPTION_SECRET), 'email'],
				`password`,
				`createdAt`,
				`updatedAt`,
			],
		});

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
		})
		res.json({
			user: {
				id: user.id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email.toString('utf8'),
			},
			token,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send('Error Authenticatings User');
	}
};
