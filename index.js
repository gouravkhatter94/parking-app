require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const sequelize = require("./sequelize");

const routes = {
    parkingSlots: require('./routes/parkingSlots'),
    getNearestParking: require("./routes/getNearestParking"),
    parkVehicle: require("./routes/parkVehicle"),
    unparkVehicle: require("./routes/unparkVehicle"),
    parkingSlotStatus: require("./routes/parkingSlotStatus")
	// Add more routes here...
	// items: require('./routes/items'),
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const checkConnection = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};
checkConnection();

// We create a wrapper to workaround async errors not being transmitted correctly.
function makeHandlerAwareOfAsyncErrors(handler) {
	return async function(req, res, next) {
		try {
			await handler(req, res);
		} catch (error) {
			next(error);
		}
	};
}

// We provide a root route just as an example
app.get('/', (req, res) => {
	res.send(`
		<h2>Hello, Sequelize + Express!</h2>
		<p>Make sure you have executed <b>npm run setup-example-db</b> once to have a populated example database. Otherwise, you will get <i>'no such table'</i> errors.</p>
		<p>Try some routes, such as <a href='/api/users'>/api/users</a> or <a href='/api/orchestras?includeInstruments'>/api/orchestras?includeInstruments</a>!</p>
		<p>To experiment with POST/PUT/DELETE requests, use a tool for creating HTTP requests such as <a href='https://github.com/jakubroztocil/httpie#readme'>HTTPie</a>, <a href='https://www.postman.com/downloads/'>Postman</a>, or even <a href='https://en.wikipedia.org/wiki/CURL'>the curl command</a>, or write some JS code for it with <a href='https://github.com/sindresorhus/got#readme'>got</a>, <a href='https://github.com/sindresorhus/ky#readme'>ky</a> or <a href='https://github.com/axios/axios#readme'>axios</a>.</p>
	`);
});

// We define the standard REST APIs for each route (if they exist).
for (const [routeName, routeController] of Object.entries(routes)) {
	if (routeController.getAll) {
		app.get(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.getAll)
		);
	}
	if (routeController.getNearestParking) {
		app.get(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.getNearestParking)
		);
	}
	if (routeController.parkVehicle) {
		app.post(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.parkVehicle)
		);
	}
	if (routeController.unparkVehicle) {
		app.put(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.unparkVehicle)
		);
	}
	if (routeController.unparkVehicle) {
		app.get(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.getReceiptTable)
		);
	}
	if (routeController.setParkingSlotUnderMaintanence) {
		app.put(
			`/api/setParkingSlotUnderMaintanence`,
			makeHandlerAwareOfAsyncErrors(routeController.setParkingSlotUnderMaintanence)
		);
	}
	if (routeController.setParkingSlotFree) {
		app.put(
			`/api/setParkingSlotFree`,
			makeHandlerAwareOfAsyncErrors(routeController.setParkingSlotFree)
		);
	}
	if (routeController.create) {
		app.post(
			`/api/${routeName}`,
			makeHandlerAwareOfAsyncErrors(routeController.create)
		);
	}
}

app.listen(3000, () => {
    console.log("Listening at 3000");
});
