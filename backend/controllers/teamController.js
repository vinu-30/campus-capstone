const Team = require('../models/Team');
const asyncHandler = require('../utils/asyncHandler');

exports.createTeam = asyncHandler(async (req, res) => {
  const { name, advisor_id = null, student_ids = [] } = req.body;
  if (!name || !Array.isArray(student_ids) || !student_ids.length) return res.status(400).json({ success: false, message: 'A team name and at least one student are required.' });
  const ids = [...new Set(student_ids.map(Number).filter(Number.isInteger))];
  if (!ids.length) return res.status(400).json({ success: false, message: 'Student IDs must be valid.' });
  res.status(201).json({ success: true, data: await Team.create({ name, advisor_id, student_ids: ids }) });
});
exports.getTeams = asyncHandler(async (req, res) => res.json({ success: true, data: await Team.getAll() }));
exports.getStudentTeam = asyncHandler(async (req, res) => {
  const team = await Team.getByStudentId(req.params.studentId);
  if (!team) return res.status(404).json({ success: false, message: 'Team not found.' });
  res.json({ success: true, data: team });
});
exports.deleteTeam = asyncHandler(async (req, res) => {
  if (!await Team.remove(req.params.id)) return res.status(404).json({ success: false, message: 'Team not found.' });
  res.json({ success: true });
});
