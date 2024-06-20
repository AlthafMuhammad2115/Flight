const express = require('express');
const router = express.Router();
const { login, addFlight, removeFlight, viewBookings } = require('../controllers/adminController');

router.post('/login', login);
router.post('/add-flight', addFlight);
router.delete('/remove-flight/:id', removeFlight);
router.get('/view-bookings', viewBookings);

module.exports = router;
