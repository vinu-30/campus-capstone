// Database functions for student project applications.

const db = require('../config/db');

const Application = {

  getAll: async () => {
    const [rows] = await db.query(`
      SELECT
        a.id,
        a.student_id,
        a.project_id,
        a.status,
        a.message,
        a.created_at,
        a.updated_at,
        s.full_name AS student_name,
        s.email AS student_email,
        s.department,
        s.year_of_study,
        p.title AS project_title
      FROM applications a
      INNER JOIN students s ON a.student_id = s.id
      INNER JOIN projects p ON a.project_id = p.id
      ORDER BY a.created_at DESC
    `);

    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      'SELECT * FROM applications WHERE id = ?',
      [id]
    );

    return rows[0];
  },

  create: async ({ student_id, project_id, message = null }) => {
    const [result] = await db.query(
      `INSERT INTO applications
        (student_id, project_id, message)
       VALUES (?, ?, ?)`,
      [student_id, project_id, message]
    );

    return Application.getById(result.insertId);
  },

  updateStatus: async (id, status) => {
    await db.query(
      `UPDATE applications
       SET status = ?
       WHERE id = ?`,
      [status, id]
    );

    return Application.getById(id);
  }

};

module.exports = Application;