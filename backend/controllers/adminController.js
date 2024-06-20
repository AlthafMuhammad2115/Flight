const Admin = require('../models/Admin');
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ adminId: admin._id }, 'secretkey', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Error logging in' });
  }
};

const addFlight = async (req, res) => {
  const { flightNumber, departureTime, arrivalTime } = req.body;
  try {
    const flight = new Flight({ flightNumber, departureTime, arrivalTime });
    await flight.save();
    res.status(201).json({ message: 'Flight added successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error adding flight' });
  }
};

const removeFlight = async (req, res) => {
  const { id } = req.params;
  try {
    await Flight.findByIdAndDelete(id);
    res.status(200).json({ message: 'Flight removed successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error removing flight' });
  }
};

const viewBookings = async (req, res) => {
  const { flightId, date } = req.query;
  try {
    const bookings = await Booking.find({
      flight: flightId,
      bookingTime: {
        $gte: new Date(date).setHours(0, 0, 0, 0),
        $lte: new Date(date).setHours(23, 59, 59, 999),
      },
    }).populate('user');
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching bookings' });
  }
};

module.exports = {
  login,
  addFlight,
  removeFlight,
  viewBookings,
};
