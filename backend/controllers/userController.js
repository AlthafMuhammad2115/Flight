const User = require('../models/User');
const Flight = require('../models/Flight');
const Booking = require('../models/Booking');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config()

const jwt_key=process.env.JWTTOKEN_KEY ;

const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error registering user' });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, jwt_key, { expiresIn: '30d' });
    res.json({token: token });
  } catch (error) {
    res.status(400).json({ error: 'Error logging in' });
  }
};

const searchFlights = async (req, res) => {
  const { date, time } = req.query;
  try {

    const flights = await Flight.find({
      departureTime: {
        $gte: new Date(date + ' ' + time),
        $lte: new Date(date + ' ' + time).setHours(23, 59, 59, 999),
      },
    });
    res.json(flights);
  } catch (error) {
    res.status(400).json({ error: 'Error searching flights' });
  }
};

const bookFlight = async (req, res) => {
  const { userId, flightId } = req.body;
  try {
    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ error: 'Flight not found' });

    if (flight.seats <= 0) return res.status(400).json({ error: 'No seats available' });

    flight.seats -= 1;
    await flight.save();

    const booking = new Booking({ user: userId, flight: flightId });
    await booking.save();

    res.status(201).json({ message: 'Flight booked successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Error booking flight' });
  }
};

const myBookings = async (req, res) => {
  const { userId } = req.query;
  try {
    const bookings = await Booking.find({ user: userId }).populate('flight');
    res.json(bookings);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching bookings' });
  }
};

const logout = (req, res) => {
  res.json({ message: 'User logged out successfully' });
};

module.exports = {
  register,
  login,
  searchFlights,
  bookFlight,
  myBookings,
  logout,
};
