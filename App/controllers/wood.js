const { Wood, Hardness, WoodType } = require('../models');
const fs = require('fs');
const path = require('path');

// Create a wood
exports.createWoods = async (req, res, next) => {
  try {
    const imagePath = req.file
      ? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
      : null;

    const wood = await Wood.create({
      ...req.body,
      image: imagePath,
    });

    res.status(201).json({ wood });
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

    res.json({ wood });
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

    res.json({ woods });
  } catch (error) {
    next(error);
  }
};

// Update a wood by id
exports.updateWoods = async (req, res, next) => {
	try {
	  const wood = await Wood.findByPk(parseInt(req.params.id));
  
	  if (!wood) {
		return res.status(404).json({ error: 'Bois non trouvé !' });
	  }
  
	  const imagePath = req.file
		? `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
		: null;
  
	  if (req.file && wood.image) {
		const imagePath = wood.image.split(
		  `${req.protocol}://${req.get('host')}/uploads/`
		)[1];
		if (fs.existsSync(`uploads/${imagePath}`)) {
		  await fs.promises.unlink(`uploads/${imagePath}`);
		}
	  }
  
	  await wood.update({ ...req.body, image: imagePath });
  
	  res.json({ wood });
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

    res.json({ woods });
  } catch (error) {
    next(error);
  }
};
exports.deleteOneWoods = async (req, res, next) => {
	try {
		const wood = await Wood.findByPk(req.params.id);

		if (!wood) {
			return res.status(404).json({ error: 'Bois non trouvé !' });
		}

		if (wood.image) {
			// On récupère le chemin de l'image
			const imagePath = wood.image.split(
				`${req.protocol}://${req.get('host')}/uploads/`
			)[1];
			fs.access(`uploads/${imagePath}`, fs.F_OK, (err) => {
				if (err) {
					console.error('err' + err);
				} else {
					fs.unlink(`uploads/${imagePath}`, (err) => {
						if (err) {
							console.error(err);
							return res
								.status(500)
								.send('Erreur lors de la suppression du bois');
						}
					});
				}
			});
		}
		wood.destroy();
		res.status(204).json();
	} catch (error) {
		console.error(error);
		res.status(500).send('Erreur lors de la suppression du bois');
	}
};
