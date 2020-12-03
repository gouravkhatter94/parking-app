async function defineTables(sequelize) {
    await sequelize.models.parking_slots.sync({ force: true });
    await sequelize.models.parking_receipt.sync({ force: true });
}

module.exports = { defineTables };
