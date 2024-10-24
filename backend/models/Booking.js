// models/Booking.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./User');
const Flight = require('./Flight');

const Booking = sequelize.define('Booking', {
  bookingTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

// Associations
User.hasMany(Booking);
Booking.belongsTo(User);
Flight.hasMany(Booking);
Booking.belongsTo(Flight);

module.exports = Booking;
