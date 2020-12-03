const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('parking_slots', {
		parking_slot_id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		status: {
			allowNull: false,
			type: DataTypes.STRING,
			validate: {
				isIn: [['free', 'parked', 'maintanence']]
            },
            defaultValue: "free"
        },
        vehicle_number: {
            allowNull: true,
			type: DataTypes.STRING
        }
	});
};
