// routes/user.js
const express = require('express');
const router = express.Router();
const {listAllFlights, register, login, searchFlights, bookFlight, myBookings, logout } = require('../controllers/userController');

router.post('/signup', register);
router.post('/login', login);
router.get('/list-flights', listAllFlights);
router.get('/search-flights', searchFlights);
router.post('/book-flight', bookFlight);
router.get('/my-bookings', myBookings);
router.post('/logout', logout);

module.exports = router;
