const API_PATH = '/api';
const USER_PATH = API_PATH + '/users';
const WOOD_PATH = API_PATH + '/woods';
const WOOD_HARDNESS_PATH = WOOD_PATH + '/hardness';
const WOOD_TYPE_PATH = WOOD_PATH + '/woodType';
function setWoodLinks(wood) {
	wood.dataValues.links = [
		{ rel: 'self', href: WOOD_PATH + '/' + wood.id },
		{ rel: 'update', href: WOOD_PATH + '/' + wood.id, method: 'PUT' },
		{ rel: 'delete', href: WOOD_PATH + '/' + wood.id, method: 'DELETE' },
	];
    //set the links for the hardness and woodType
    setHardnessLinks(wood);
    setWoodTypeLinks(wood);

}

function setHardnessLinks(wood) {
	wood.dataValues.Hardness.dataValues.links = [
		{ rel: 'self', href: WOOD_HARDNESS_PATH + '/' + wood.dataValues.hardnessId },
		{ rel: 'update', href: WOOD_HARDNESS_PATH + '/' + wood.dataValues.hardnessId, method: 'PUT' },
		{ rel: 'delete', href: WOOD_HARDNESS_PATH + '/' + wood.dataValues.hardnessId, method: 'DELETE' },
	];
}

function setWoodTypeLinks(wood) {
	wood.dataValues.WoodType.dataValues.links = [
		{ rel: 'self', href: WOOD_TYPE_PATH + '/' + wood.dataValues.typeId },
		{ rel: 'update', href: WOOD_TYPE_PATH + '/' + wood.dataValues.typeId, method: 'PUT' },
		{ rel: 'delete', href: WOOD_TYPE_PATH + '/' + wood.dataValues.typeId, method: 'DELETE' },
	];
}

function setUserLinks(user) {
    user.dataValues.links = [
        { rel: 'self', href: USER_PATH + '/' + user.id },
    ];
}


module.exports = {
    setWoodLinks,
    setHardnessLinks,
    setWoodTypeLinks,
    setUserLinks
}