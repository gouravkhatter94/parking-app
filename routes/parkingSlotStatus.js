const sequelize = require('../sequelize');

async function setParkingSlotUnderMaintanence(req, res) {
    const {slotId} = req.body;

	if (!slotId) {
		return res.status(400).send(`slotId is required`);
	} else {
        const parkingSlot = await sequelize.models.parking_slots.findOne({
            parking_slot_id: slotId
        });

        if (!parkingSlot) {
            return res.status(400).send(`slotId is invalid`);
        }

        if (parkingSlot.status === "maintanence") {
            return res.status(400).send(`slot is already under maintanence`);
        }

        if (parkingSlot.status === "parked") {
            return res.status(400).send(`slot is not empty`);
        }

        parkingSlot.status = "maintanence";

        let updatedData = await parkingSlot.save();

        updatedData = updatedData.get();

        res.status(200).json(updatedData);
	}
};

async function setParkingSlotFree(req, res) {
    const {slotId} = req.body;

	if (!slotId) {
		return res.status(400).send(`slotId is required`);
	} else {
        const parkingSlot = await sequelize.models.parking_slots.findOne({
            parking_slot_id: slotId
        });

        if (!parkingSlot) {
            return res.status(400).send(`slotId is invalid`);
        }

        if (parkingSlot.status === "free") {
            return res.status(400).send(`slot is already free`);
        }

        if (parkingSlot.status === "parked") {
            return res.status(400).send(`vehicle is parked at slot`);
        }

        parkingSlot.status = "free";

        let updatedData = await parkingSlot.save();

        updatedData = updatedData.get();

        res.status(200).json(updatedData);
	}
};

module.exports = {
    setParkingSlotUnderMaintanence,
    setParkingSlotFree
};
