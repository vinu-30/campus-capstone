// Handles HTTP requests for student records.
const Student = require('../models/Student');
const asyncHandler = require('../utils/asyncHandler');

const requiredFields = ['full_name', 'email', 'department', 'year_of_study'];
const hasRequiredFields = (data) => requiredFields.every((field) => data[field]);
const githubUsername = (value) => {
  if (!value) return null;
  const username = String(value).trim().replace(/^https?:\/\/(www\.)?github\.com\//i, '').replace(/^@/, '').replace(/\/$/, '');
  return /^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(username) ? username : false;
};
const prepareStudent = (data) => {
  const username = githubUsername(data.github_username);
  return username === false ? null : { ...data, github_username: username };
};

exports.getStudents = asyncHandler(async (req, res) => { res.json({ success: true, data: await Student.getAll() }); });
exports.getStudent = asyncHandler(async (req, res) => { const student = await Student.getById(req.params.id); if (!student) return res.status(404).json({ success: false, message: 'Student not found.' }); res.json({ success: true, data: student }); });
exports.createStudent = asyncHandler(async (req, res) => { if (!hasRequiredFields(req.body)) return res.status(400).json({ success: false, message: 'Please provide name, email, department, and year of study.' }); const data = prepareStudent(req.body); if (!data) return res.status(400).json({ success: false, message: 'Please enter a valid GitHub username or profile URL.' }); const student = await Student.create(data); res.status(201).json({ success: true, data: student }); });
exports.updateStudent = asyncHandler(async (req, res) => { if (!hasRequiredFields(req.body)) return res.status(400).json({ success: false, message: 'Please provide all student fields.' }); const data = prepareStudent(req.body); if (!data) return res.status(400).json({ success: false, message: 'Please enter a valid GitHub username or profile URL.' }); const student = await Student.update(req.params.id, data); if (!student) return res.status(404).json({ success: false, message: 'Student not found.' }); res.json({ success: true, data: student }); });
exports.deleteStudent = asyncHandler(async (req, res) => { if (!await Student.remove(req.params.id)) return res.status(404).json({ success: false, message: 'Student not found.' }); res.json({ success: true, message: 'Student deleted successfully.' }); });
