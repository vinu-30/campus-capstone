// Handles HTTP requests for student records.
const Student = require('../models/Student');
const asyncHandler = require('../utils/asyncHandler');

const requiredFields = ['full_name', 'email', 'department', 'year_of_study'];
const hasRequiredFields = (data) => requiredFields.every((field) => data[field]);

exports.getStudents = asyncHandler(async (req, res) => { res.json({ success: true, data: await Student.getAll() }); });
exports.getStudent = asyncHandler(async (req, res) => { const student = await Student.getById(req.params.id); if (!student) return res.status(404).json({ success: false, message: 'Student not found.' }); res.json({ success: true, data: student }); });
exports.createStudent = asyncHandler(async (req, res) => { if (!hasRequiredFields(req.body)) return res.status(400).json({ success: false, message: 'Please provide name, email, department, and year of study.' }); const student = await Student.create(req.body); res.status(201).json({ success: true, data: student }); });
exports.updateStudent = asyncHandler(async (req, res) => { if (!hasRequiredFields(req.body)) return res.status(400).json({ success: false, message: 'Please provide all student fields.' }); const student = await Student.update(req.params.id, req.body); if (!student) return res.status(404).json({ success: false, message: 'Student not found.' }); res.json({ success: true, data: student }); });
exports.deleteStudent = asyncHandler(async (req, res) => { if (!await Student.remove(req.params.id)) return res.status(404).json({ success: false, message: 'Student not found.' }); res.json({ success: true, message: 'Student deleted successfully.' }); });
