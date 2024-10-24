const Admin = require('../models/Admin');
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize'); // Import Op for Sequelize operators

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check if the username already exists
    const existingAdmin = await Admin.findOne({ where: { username } });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }

    // Create a new admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error registering admin' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { username } });
    if (!admin) return res.status(404).json({ error: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ adminId: admin.id }, process.env.JWTTOKEN_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: 'Error logging in' });
  }
};

const addFlight = async (req, res) => {
  const { flightNumber, departureTime, arrivalTime } = req.body;
  try {
    const flight = await Flight.create({ flightNumber, departureTime, arrivalTime });
    res.status(201).json({ message: 'Flight added successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error adding flight' });
  }
};

const removeFlight = async (req, res) => {
  const { id } = req.params;
  try {
    await Flight.destroy({ where: { id } });
    res.status(200).json({ message: 'Flight removed successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error removing flight' });
  }
};

const viewBookings = async (req, res) => {
  const { flightId, date } = req.query;
  try {
    const bookings = await Booking.findAll({
      where: {
        flightId,
        bookingTime: {
          [Op.between]: [
            new Date(date).setHours(0, 0, 0, 0),
            new Date(date).setHours(23, 59, 59, 999),
          ],
        },
      },
      include: [{ model: User, required: true }] // Make sure to include the User model if necessary
    });
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
  register
};
