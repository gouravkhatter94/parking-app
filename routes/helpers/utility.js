const getNearestParking = async (models, transaction) => {
    let query = {
        where: {
            status: "free"
        },
        order: [
            ["parking_slot_id", "ASC"]
        ]
    };

    if (transaction) {
        query = {
            ...query,
            limit: 1,
            lock: true,
            skipLocked: true,
            transaction
        };
    }

    const parkingSlot = await models.parking_slots.findOne(query);
    
    return parkingSlot;
}

module.exports = {
    getNearestParking
};
