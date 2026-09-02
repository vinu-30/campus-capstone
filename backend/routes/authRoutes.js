// Maps authentication endpoints to the authentication controller.
const router = require('express').Router();
const controller = require('../controllers/authController');

// Register a new user.
router.post('/register', controller.register);

// Login an existing user.
router.post('/login', controller.login);

module.exports = router;