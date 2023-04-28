const { Wood, Hardness, WoodType } = require('../models');
const fs = require('fs');
const { setWoodLinks } = require('../utils/linkSetter');
const path = require('path');

// Create a wood
exports.createWoods = async (req, res, next) => {
	try {
		const imagePath = req.file
			? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
			: null;

		const wood = await Wood.build({
			...req.body,
			image: imagePath,
		});
		await wood.save();
		await wood.reload({ include: [{ model: Hardness }, { model: WoodType }] });
		setWoodLinks(wood);

		res.status(201).json(wood);
	} catch (error) {
		next(error);
	}
};

// Get one wood by id
exports.getOneWoods = async (req, res, next) => {
	try {
		const wood = await Wood.findByPk(req.params.id, {
			include: [{ model: Hardness }, { model: WoodType }],
		});

		if (!wood) {
			return res.status(404).json({ error: 'Bois non trouvé !' });
		}
		setWoodLinks(wood);
		res.json(wood);
	} catch (error) {
		next(error);
	}
};

// Get all woods
exports.getAllWoods = async (req, res, next) => {
	try {
		const woods = await Wood.findAll({
			include: [{ model: Hardness }, { model: WoodType }],
		});
		woods.forEach((wood) => {
			setWoodLinks(wood);
		});
		res.json({ woods });
	} catch (error) {
		next(error);
	}
};

// Get woods by hardness
exports.findByHardness = async (req, res, next) => {
	try {
		const { hardness } = req.params;

		const hardnessData = await Hardness.findOne({
			where: {
				name: hardness,
			},
		});

		const woods = await Wood.findAll({
			where: {
				hardnessId: hardnessData.id,
			},
			include: [{ model: Hardness }, { model: WoodType }],
		});

		//add links to each wood
		woods.forEach((wood) => {
			setWoodLinks(wood);
		});

		res.json({ woods: woods });
	} catch (error) {
		next(error);
	}
};

// Update a wood by id
exports.updateWoods = async (req, res, next) => {
	try {
		const wood = await Wood.findByPk(parseInt(req.params.id), {
			include: [{ model: Hardness }, { model: WoodType }],
		});

		if (!wood) {
			return res.status(404).json({ error: 'Bois non trouvé !' });
		}

		const safeProtocols = ['http', 'https'];
		const isSafeProtocol = safeProtocols.includes(req.protocol);
		if (!isSafeProtocol) {
			console.error('Protocol not allowed');
			return res.status(400).send('Protocol not allowed');
		}
		const safeHost = req.get('host'); // Add validation if necessary

		const imagePath = req.file
			? `${req.protocol}://${safeHost}/uploads/${req.file.filename}`
			: wood.image;

		if (req.file && wood.image && /^image/.test(req.file.mimetype)) {
			const woodImagePath = wood.image.split(
				`${req.protocol}://${safeHost}/uploads/`
			)[1];
			const woodImagePathSafe = path.normalize(`uploads/${woodImagePath}`);

			if (fs.existsSync(woodImagePathSafe)) {
				try {
					await fs.promises.unlink(woodImagePathSafe);
				} catch (err) {
					console.error(err);
					return res.status(500).send('Error deleting old wood image');
				}
			}
		}

		await wood.update({ ...req.body, image: imagePath });
		await wood.reload({ include: [{ model: Hardness }, { model: WoodType }] });

		setWoodLinks(wood);
		res.json(wood);
	} catch (error) {
		next(error);
	}
};
exports.deleteOneWoods = async (req, res) => {
	try {
		const wood = await Wood.findByPk(req.params.id);

		if (!wood) {
			return res.status(404).json({ error: 'Bois non trouvé !' });
		}

		if (wood.image) {
			const imagePath = wood.image.split(
				`${req.protocol}://${req.get('host')}/uploads/`
			)[1];
			const imagePathSafe = path.normalize(`uploads/${imagePath}`);

			if (fs.existsSync(imagePathSafe)) {
				await fs.promises.unlink(imagePathSafe);
			}
		}

		await wood.destroy();
		res.status(204).json(wood);
	} catch (error) {
		console.error(error);
		res.status(500).send('Erreur lors de la suppression du bois');
	}
};
