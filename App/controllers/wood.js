const { Wood } = require('../models');

exports.createWoods = (req, res, next) => {
    //path = si null alors on met null sinon on met le chemin de l'image
	const wood = new Wood({
		...req.body,
		image: req.file ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}` : null,
	});

	// On enregistre l'objet Wood dans la base de données
	wood
		.save()
		.then(() =>
			res.status(201).json({ message: 'Essence de bois enregistrée !' })
		)
		.catch((error) => res.status(400).json({ error }));
};

exports.getOneWoods = async (req, res, next) => {
	try {
		const woods = await Wood.findByPk(req.params.id);
		res.json(woods);
	} catch (error) {
		console.error(error);
		res.status(500).send('Error retrieving woods');
	}
};
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
