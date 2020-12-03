Use 

npm install

for installing dependencies

# API's

### API for creating new slots - 
POST endpoint - http://localhost:3000/api/parkingSlots
body part - 
{
	"parkingSlots" : 2
}
This will create 2 new slots

### API for getting parking slot details - 
GET endpoint - http://localhost:3000/api/parkingSlots

### API for Getting Nearest Empty Slot - 
GET  endpoint - http://localhost:3000/api/getNearestParking

### API for park vehicle at nearest empty slots - 
POST endpoint - http://localhost:3000/api/parkVehicle
body part - 
{
	"vehicleNumber" : "HR20V2219"
}

### API for unpark vehicle - 
PUT endpoint - http://localhost:3000/api/unparkVehicle
body part - 
{
	"vehicleNumber" : "HR20V2219"
}

### API for put parking slot under maintanence - 
PUT endpoint - http://localhost:3000/api/setParkingSlotUnderMaintanence
body part - 
{
	"slotId" : 1
}

### API for free parking slot from maintanence - 
PUT endpoint - http://localhost:3000/api/setParkingSlotFree
body part - 
{
	"slotId" : 1
}
