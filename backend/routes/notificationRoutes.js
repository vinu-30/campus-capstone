const router = require('express').Router();
const controller = require('../controllers/notificationController');

router.get('/', controller.getNotifications);
router.post('/', controller.createNotification);
router.put('/:id/read', controller.markAsRead);
router.delete('/:id', controller.deleteNotification);

module.exports = router;