// Handles HTTP requests for capstone project records.
const Project = require('../models/Project');
const asyncHandler = require('../utils/asyncHandler');

exports.getProjects = asyncHandler(async (req, res) => { res.json({ success: true, data: await Project.getAll() }); });
exports.getProject = asyncHandler(async (req, res) => { const project = await Project.getById(req.params.id); if (!project) return res.status(404).json({ success: false, message: 'Project not found.' }); res.json({ success: true, data: project }); });
exports.createProject = asyncHandler(async (req, res) => { if (!req.body.title || !req.body.category) return res.status(400).json({ success: false, message: 'Project title and category are required.' }); const project = await Project.create(req.body); res.status(201).json({ success: true, data: project }); });
exports.updateProject = asyncHandler(async (req, res) => { if (!req.body.title || !req.body.category) return res.status(400).json({ success: false, message: 'Project title and category are required.' }); const project = await Project.update(req.params.id, req.body); if (!project) return res.status(404).json({ success: false, message: 'Project not found.' }); res.json({ success: true, data: project }); });
exports.deleteProject = asyncHandler(async (req, res) => { if (!await Project.remove(req.params.id)) return res.status(404).json({ success: false, message: 'Project not found.' }); res.json({ success: true, message: 'Project deleted successfully.' }); });
