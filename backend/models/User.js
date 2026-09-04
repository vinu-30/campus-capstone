const db = require('../config/db');

const User = {
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT u.id, u.full_name, u.email, u.role, u.status, u.created_at,
        COALESCE(s.department, f.department, '') AS department
      FROM users u
      LEFT JOIN students s ON s.email = u.email
      LEFT JOIN faculty_advisors f ON f.email = u.email
      ORDER BY u.created_at DESC
    `);
    return rows;
  },
  getByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },
  getById: async (id) => {
    const [rows] = await db.query('SELECT id, full_name, email, role, status, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  },
  create: async ({ full_name, email, password_hash, role }) => {
    const [result] = await db.query(
      "INSERT INTO users (full_name, email, password_hash, role, status) VALUES (?, ?, ?, ?, 'Active')",
      [full_name, email, password_hash, role]
    );
    return User.getById(result.insertId);
  },
  updateStatus: async (id, status) => {
    await db.query('UPDATE users SET status = ? WHERE id = ?', [status, id]);
    return User.getById(id);
  }
};

module.exports = User;
