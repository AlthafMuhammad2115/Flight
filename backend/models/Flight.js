const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  departureTime: { type: Date, required: true },
  arrivalTime: { type: Date, required: true },
  seats: { type: Number, default: 60 },
});

module.exports = mongoose.model('Flight', FlightSchema);
