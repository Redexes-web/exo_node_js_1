const bcrypt = require('bcrypt');
const { User } = require('../models');

exports.signup = async (req, res) => {
	try {
		const { firstName, lastName, email, password } = req.body;

		// Create user in database
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		res.json(user);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error creating user');
	}
};

exports.login = (req, res) => {
	res.send('You are login');
};
