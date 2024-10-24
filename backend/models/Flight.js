// models/Flight.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Flight = sequelize.define('Flight', {
  flightNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  departureTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  arrivalTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  seats: {
    type: DataTypes.INTEGER,
    defaultValue: 60
  }
});

module.exports = Flight;
