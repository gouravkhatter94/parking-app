const sequelize = require('../sequelize');
const utility = require("./helpers/utility");

async function parkVehicle(req, res) {
    const {vehicleNumber} = req.body;

	if (!vehicleNumber) {
		return res.status(400).send(`vehicleNumber is required`);
	} else {
        const nearestParking = await utility.getNearestParking(sequelize.models);
        if (!nearestParking) {
            return res.status(400).send(`Parking is full`);
        }

        const t = await sequelize.transaction();

        try { 
            const isParkingAvailable = await sequelize.models.parking_slots.update({
                status: "parked",
                vehicle_number: vehicleNumber
            }, {
                where: {
                    parking_slot_id: nearestParking.parking_slot_id,
                    status: "free"
                }
            }, {
                transaction: t
            });

            if (isParkingAvailable) {
                const parkingReceipt = await sequelize.models.parking_receipt.create({
                    vehicle_number: vehicleNumber,
                    parking_slot_id: nearestParking.parking_slot_id
                }, {
                    transaction: t
                });
    
                await t.commit();
    
                res.status(200).json(parkingReceipt);
            } else {
                await t.rollback();
                return res.status(400).send(`Try again`);
            }            
        } catch(err) {
            await t.rollback();
            return res.status(400).send(`Try again`);
        }
	}
};

module.exports = {
	parkVehicle
};
