const { Wood } = require('../models');
const fs = require('fs');
const path = require('path');

exports.createWoods = (req, res, next) => {
	//path = si null alors on met null sinon on met le chemin de l'image
	const wood = new Wood({
		...req.body,
		image: req.file
			? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
			: null,
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
        if (!woods) {
            return res.status(404).json({ error: 'Essence de bois non trouvée !' });
        }
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
exports.deleteOneWoods = async (req, res, next) => {
	try {
		const wood = await Wood.findByPk(req.params.id);

		if (!wood) {
			return res.status(404).json({ error: 'Wood not found' });
		}

		if (wood.image) {
			// On récupère le chemin de l'image
            const imagePath = wood.image.split(`${req.protocol}://${req.get('host')}/uploads/`)[1];

			// On supprime le fichier correspondant
			fs.unlink(`uploads/${imagePath}`, (err) => {
				if (err) {
					console.error(err);
					return res.status(500).json({ error: 'Error deleting image' });
				}
				// Si la suppression s'est bien passée, on supprime l'essence de bois de la base de données
				wood.destroy();
				res.status(204).json();
			});
		} else {
			// Si l'essence de bois n'a pas d'image associée, on supprime directement l'essence de bois de la base de données
			wood.destroy();
			res.status(204).json();
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Error deleting wood');
	}
};
