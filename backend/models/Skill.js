const db = require('../config/db');

const Skill = {
  getAll: async () => {
    const [rows] = await db.query(`
      SELECT s.*, COUNT(ss.student_id) AS students
      FROM skills s LEFT JOIN student_skills ss ON ss.skill_id = s.id
      GROUP BY s.id ORDER BY s.name
    `);
    return rows;
  },
  create: async ({ name, category = null }) => {
    const [result] = await db.query('INSERT INTO skills (name, category) VALUES (?, ?)', [name, category]);
    const [rows] = await db.query('SELECT id, name, category, created_at, 0 AS students FROM skills WHERE id = ?', [result.insertId]);
    return rows[0];
  },
  remove: async (id) => {
    const [result] = await db.query('DELETE FROM skills WHERE id = ?', [id]);
    return result.affectedRows;
  }
};
module.exports = Skill;
