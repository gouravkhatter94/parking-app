const { models } = require('../sequelize');
const utility = require("./helpers/utility");
// const { getIdParam } = require('../helpers');

async function getNearestParking(_, res, transaction) {
    const nearestParking = await utility.getNearestParking(models);
	res.status(200).json(nearestParking);
};

module.exports = {
	getNearestParking
};
