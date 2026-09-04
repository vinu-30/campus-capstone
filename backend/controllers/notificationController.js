const Notification = require('../models/Notification');
const asyncHandler = require('../utils/asyncHandler');

exports.getNotifications = asyncHandler(async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({
      success: false,
      message: 'user_id is required.'
    });
  }

  const notifications = await Notification.getByUserId(user_id);

  res.json({
    success: true,
    data: notifications
  });
});

exports.createNotification = asyncHandler(async (req, res) => {
  const { user_id, message, type } = req.body;

  if (!user_id || !message) {
    return res.status(400).json({
      success: false,
      message: 'user_id and message are required.'
    });
  }

  const notification = await Notification.create({
    user_id,
    message,
    type
  });

  res.status(201).json({
    success: true,
    data: notification
  });
});

exports.markAsRead = asyncHandler(async (req, res) => {
  const notification = await Notification.markAsRead(req.params.id);

  if (!notification) {
    return res.status(404).json({
      success: false,
      message: 'Notification not found.'
    });
  }

  res.json({
    success: true,
    data: notification
  });
});

exports.deleteNotification = asyncHandler(async (req, res) => {
  const deleted = await Notification.remove(req.params.id);

  if (!deleted) {
    return res.status(404).json({
      success: false,
      message: 'Notification not found.'
    });
  }

  res.json({
    success: true,
    message: 'Notification deleted successfully.'
  });
});