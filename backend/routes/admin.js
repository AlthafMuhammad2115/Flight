// routes/admin.js
const express = require('express');
const router = express.Router();
const { register,login, addFlight, removeFlight, viewBookings } = require('../controllers/adminController');

router.post('/signup', register);
router.post('/login', login);
router.post('/add-flight', addFlight);
router.delete('/remove-flight/:id', removeFlight);
router.get('/view-bookings', viewBookings);

module.exports = router;
