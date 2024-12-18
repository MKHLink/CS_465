const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

function createAuthMiddleware(secretKey) {
    return (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Authorization header missing or malformed' });
        }

        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, { algorithms: ['HS256'] }, (err, payload) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid or expired token' });
            }

            req.payload = payload; 
            next();
        });
    };
}

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

const auth = createAuthMiddleware(process.env.JWT_SECRET);

router
    .route('/test')
    .get((req, res) => {
        res.status(200).json({ message: 'API works!' });
    });

router
    .route('/trips')
    .get(tripsController.tripList)
    .post(tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

router.get('/debug-token', auth, (req, res) => {
    console.log('Debug Token Payload:', req.payload);
    res.json({
        message: 'Token validated',
        payload: req.payload,
    });
});

module.exports = router;
