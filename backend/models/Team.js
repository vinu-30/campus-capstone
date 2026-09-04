// Database functions for teams and team members.

const db = require('../config/db');

const Team = {

  create: async ({ name, advisor_id = null, student_ids = [] }) => {
    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      const [teamResult] = await connection.query(
        `INSERT INTO teams (name, advisor_id)
         VALUES (?, ?)`,
        [name, advisor_id]
      );

      const teamId = teamResult.insertId;

      for (const studentId of student_ids) {
        await connection.query(
          `INSERT INTO team_members (team_id, student_id)
           VALUES (?, ?)`,
          [teamId, studentId]
        );
      }

      await connection.commit();

      return {
        id: teamId,
        name,
        advisor_id,
        student_ids
      };

    } catch (error) {
      await connection.rollback();
      throw error;

    } finally {
      connection.release();
    }
  },

  getAll: async () => {
    const [rows] = await db.query(`
      SELECT
        t.id,
        t.name,
        t.advisor_id,
        t.created_at,
        COUNT(tm.student_id) AS member_count,
        GROUP_CONCAT(s.full_name ORDER BY s.full_name SEPARATOR ', ') AS member_names
      FROM teams t
      LEFT JOIN team_members tm
        ON t.id = tm.team_id
      LEFT JOIN students s ON s.id = tm.student_id
      GROUP BY t.id
      ORDER BY t.created_at DESC
    `);

    return rows;
  },
  getByStudentId: async (studentId) => {
    const [rows] = await db.query(`SELECT t.id, t.name, t.advisor_id, p.id AS project_id, p.title AS project_title, p.description AS project_description, p.progress, p.status, GROUP_CONCAT(s.full_name ORDER BY s.full_name SEPARATOR ', ') AS member_names FROM team_members mine JOIN teams t ON t.id = mine.team_id LEFT JOIN projects p ON p.team_id = t.id LEFT JOIN team_members tm ON tm.team_id = t.id LEFT JOIN students s ON s.id = tm.student_id WHERE mine.student_id = ? GROUP BY t.id, p.id ORDER BY t.created_at DESC LIMIT 1`, [studentId]);
    return rows[0];
  },
  remove: async (id) => { const [result] = await db.query('DELETE FROM teams WHERE id = ?', [id]); return result.affectedRows; }

};

module.exports = Team;
