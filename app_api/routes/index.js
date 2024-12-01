const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

router
    .route('/test')
    .get((req, res) => {
        res.status(200).json({ message: 'API works!' });
    });

router
    .route('/trips')
    .get(tripsController.tripList);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode);

module.exports = router;