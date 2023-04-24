const { Wood } = require('../models');

exports.getAllWoods = async (req, res) => {
	try {
		const woods = await Wood.findAll();

		res.json(woods);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error retrieving woods');
	}
};
exports.findByHardness = async (req, res) => {
	const { hardness } = req.params;

	try {
		const woods = await Wood.findAll({
			where: {
				hardness: hardness,
			},
		});

		res.json(woods);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error retrieving woods by hardness');
	}
};
