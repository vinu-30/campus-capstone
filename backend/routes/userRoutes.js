const router = require('express').Router();
const controller = require('../controllers/userController');
router.get('/', controller.getUsers);
router.post('/register', controller.register);
router.post('/login', controller.login);
router.patch('/:id/status', controller.updateStatus);
module.exports = router;
