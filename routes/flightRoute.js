const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');

router.get('/', controller.instructions)

router.post('/create-flight', controller.createFlight)

router.get('/get-flights', controller.getFlights)

router.get('/get-flight/:id', controller.getFlight)

router.put('/update-flight/:id', controller.updateFlight)

router.delete('/delete-flight/:id', controller.deleteFlight)

module.exports = router;

