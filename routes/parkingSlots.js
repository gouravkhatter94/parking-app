const { models } = require('../sequelize');
const Q = require("q");

async function getAll(req, res) {
	const parkingSlots = await models.parking_slots.findAll();
	res.status(200).json(parkingSlots);
};

async function create(req, res) {
    const {parkingSlots} = req.body;

	if (!parkingSlots) {
		res.status(400).send(`parkingSlots are required`);
	} else {
        const arrPromise = [];

        for (let i=0; i < parkingSlots; i++) {
            arrPromise.push(models.parking_slots.create({}));
        }

        await Q.all(arrPromise);

		res.status(201).end();
	}
};

module.exports = {
	getAll,
	create
};
