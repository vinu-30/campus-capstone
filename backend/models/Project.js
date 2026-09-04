// Database functions for the capstone projects table.

const db = require('../config/db');

const Project = {

  getAll: async () => {
    const [rows] = await db.query(
      'SELECT p.*, t.name AS team_name FROM projects p LEFT JOIN teams t ON p.team_id = t.id ORDER BY p.created_at DESC'
    );

    return rows;
  },

  getById: async (id) => {
    const [rows] = await db.query(
      'SELECT * FROM projects WHERE id = ?',
      [id]
    );

    return rows[0];
  },

  create: async ({
    title,
    category,
    technologies,
    required_skills,
    team_members,
    duration,
    deadline,
    description,
    status = 'Planning',
    progress = 0,
    team_id = null
  }) => {

    const [result] = await db.query(
      `INSERT INTO projects
      (
        title,
        category,
        technologies,
        required_skills,
        team_members,
        duration,
        deadline,
        description,
        status,
        progress,
        team_id
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        category,
        technologies,
        required_skills,
        team_members,
        duration,
        deadline,
        description,
        status,
        progress,
        team_id
      ]
    );

    return Project.getById(result.insertId);
  },

  update: async (
    id,
    {
      title,
      category,
      technologies,
      required_skills,
      team_members,
      duration,
      deadline,
      description,
      status,
      progress,
      team_id = null
    }
  ) => {

    await db.query(
      `UPDATE projects SET
        title = ?,
        category = ?,
        technologies = ?,
        required_skills = ?,
        team_members = ?,
        duration = ?,
        deadline = ?,
        description = ?,
        status = ?,
        progress = ?,
        team_id = ?
      WHERE id = ?`,
      [
        title,
        category,
        technologies,
        required_skills,
        team_members,
        duration,
        deadline,
        description,
        status,
        progress,
        team_id,
        id
      ]
    );

    return Project.getById(id);
  },

  remove: async (id) => {
    const [result] = await db.query(
      'DELETE FROM projects WHERE id = ?',
      [id]
    );

    return result.affectedRows;
  },

};

module.exports = Project;