const Skill = require('../models/Skill');
const asyncHandler = require('../utils/asyncHandler');
exports.getSkills = asyncHandler(async (req, res) => res.json({ success: true, data: await Skill.getAll() }));
exports.createSkill = asyncHandler(async (req, res) => {
  if (!req.body.name) return res.status(400).json({ success: false, message: 'Skill name is required.' });
  res.status(201).json({ success: true, data: await Skill.create(req.body) });
});
exports.deleteSkill = asyncHandler(async (req, res) => {
  if (!await Skill.remove(req.params.id)) return res.status(404).json({ success: false, message: 'Skill not found.' });
  res.json({ success: true });
});
