// Provides the summary numbers needed by the frontend dashboard.
const db = require('../config/db');
const asyncHandler = require('../utils/asyncHandler');

exports.getDashboardSummary = asyncHandler(async (req, res) => {
  const [[students], [projects], [teams], [skills], [recentProjects]] = await Promise.all([
    db.query('SELECT COUNT(*) AS total FROM students'), db.query('SELECT COUNT(*) AS total FROM projects'),
    db.query('SELECT COUNT(*) AS total FROM teams'), db.query('SELECT COUNT(*) AS total FROM skills'),
    db.query('SELECT id, title, category, status, progress FROM projects ORDER BY created_at DESC LIMIT 5'),
  ]);
  res.json({ success: true, data: { totals: { students: students[0].total, projects: projects[0].total, teams: teams[0].total, skills: skills[0].total }, recentProjects } });
});
