const sequelize = require('../sequelize');

async function unparkVehicle(req, res) {
    const {vehicleNumber} = req.body;

	if (!vehicleNumber) {
		return res.status(400).send(`vehicleNumber is required`);
	} else {
        const parkingReceipt = await sequelize.models.parking_receipt.findOne({
            vehicle_number: vehicleNumber,
            unparked_time: null
        });

        if (!parkingReceipt) {
            return res.status(400).send("vehicle is not parked");
        }

        parkingReceipt.unparked_time = new Date();
        
        let updatedData = await parkingReceipt.save();
        updatedData = updatedData.get();

        await sequelize.models.parking_slots.update({
            status: "free",
            vehicle_number: null
        },{
            where: {
                parking_slot_id: updatedData.parking_slot_id,
                status: "parked",
                vehicle_number: updatedData.vehicle_number
            }
        });

        const parkingDuration = Math.ceil((new Date(String(updatedData.unparked_time)).getTime() - new Date(String(updatedData.parked_time)).getTime()) / 3600000);
        const parkingCharges = process.env.PARKING_FEE * parkingDuration + process.env.CURRENCY;

        res.status(200).json({
            parkingCharges
        });        
	}
};

async function getReceiptTable (req, res) {
    const data = await sequelize.models.parking_receipt.findAll();

    res.status(200).json(data);
}

module.exports = {
    unparkVehicle,
    getReceiptTable
};
