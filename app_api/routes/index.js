const express = require('express');
const router = express.Router();
const { expressjwt: jwt } = require('express-jwt');

const auth = jwt({
  secret: process.env.JWT_SECRET,       
  algorithms: ['HS256'],               
  userProperty: 'payload',             
});


const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

router
    .route('/test')
    .get((req, res) => {
        res.status(200).json({ message: 'API works!' });
    });

router
    .route('/trips')
    .get(tripsController.tripList)
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

router
    .route('/login')
    .post(authController.login);

router 
    .route('/register')
    .post(authController.register);

    router
    .route('/debug')
    .get(auth, (req, res) => {
        res.status(200).json({ payload: req.payload });
    });


module.exports = router;