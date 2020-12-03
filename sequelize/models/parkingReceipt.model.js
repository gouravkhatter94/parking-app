const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize, Sequelize) => {
	sequelize.define('parking_receipt', {
		parking_receipt_id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
        vehicle_number: {
            allowNull: false,
			type: DataTypes.STRING
        },
		parked_time: {
			allowNull: false,
            type: DataTypes.DATE,
            defaultValue: Sequelize.NOW
        },
		unparked_time: {
			allowNull: true,
            type: DataTypes.DATE
        },
        parking_slot_id: {
			allowNull: false,
			type: DataTypes.INTEGER
		}
	});
};
