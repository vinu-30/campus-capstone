// Database functions for the students table.
const db = require('../config/db');

const Student = {
  getAll: async () => { const [rows] = await db.query('SELECT * FROM students ORDER BY created_at DESC'); return rows; },
  getById: async (id) => { const [rows] = await db.query('SELECT * FROM students WHERE id = ?', [id]); return rows[0]; },
  create: async ({ full_name, email, department, year_of_study }) => { const [result] = await db.query('INSERT INTO students (full_name, email, department, year_of_study) VALUES (?, ?, ?, ?)', [full_name, email, department, year_of_study]); return Student.getById(result.insertId); },
  update: async (id, { full_name, email, department, year_of_study }) => { await db.query('UPDATE students SET full_name = ?, email = ?, department = ?, year_of_study = ? WHERE id = ?', [full_name, email, department, year_of_study, id]); return Student.getById(id); },
  remove: async (id) => { const [result] = await db.query('DELETE FROM students WHERE id = ?', [id]); return result.affectedRows; },
};
module.exports = Student;
