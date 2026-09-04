// Database functions for the notifications table.

const db = require('../config/db');

const Notification = {

  getByUserId: async (user_id) => {
    const [rows] = await db.query(
      `SELECT *
       FROM notifications
       WHERE user_id = ?
       ORDER BY created_at DESC`,
      [user_id]
    );

    return rows;
  },

  create: async ({ user_id, message, type = 'info' }) => {
    const [result] = await db.query(
      `INSERT INTO notifications
       (user_id, message, type)
       VALUES (?, ?, ?)`,
      [user_id, message, type]
    );

    const [rows] = await db.query(
      'SELECT * FROM notifications WHERE id = ?',
      [result.insertId]
    );

    return rows[0];
  },

  markAsRead: async (id) => {
    await db.query(
      'UPDATE notifications SET is_read = TRUE WHERE id = ?',
      [id]
    );

    const [rows] = await db.query(
      'SELECT * FROM notifications WHERE id = ?',
      [id]
    );

    return rows[0];
  },

  remove: async (id) => {
    const [result] = await db.query(
      'DELETE FROM notifications WHERE id = ?',
      [id]
    );

    return result.affectedRows;
  },

};

module.exports = Notification;