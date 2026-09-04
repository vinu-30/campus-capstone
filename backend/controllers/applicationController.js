// Handles student project applications.

const Application = require('../models/Application');
const asyncHandler = require('../utils/asyncHandler');

exports.getApplications = asyncHandler(async (req, res) => {
  const applications = await Application.getAll();

  res.json({
    success: true,
    data: applications
  });
});

exports.createApplication = asyncHandler(async (req, res) => {
  const { student_id, project_id, message } = req.body;

  if (!student_id || !project_id) {
    return res.status(400).json({
      success: false,
      message: 'student_id and project_id are required.'
    });
  }

  let application;
  try {
    application = await Application.create({ student_id, project_id, message });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') return res.status(409).json({ success: false, message: 'You have already applied to this project.' });
    throw error;
  }

  res.status(201).json({
    success: true,
    data: application
  });
});

exports.updateApplicationStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['Accepted', 'Rejected'].includes(status)) {
    return res.status(400).json({
      success: false,
      message: 'Status must be Accepted or Rejected.'
    });
  }

  const application = await Application.updateStatus(id, status);

  if (!application) {
    return res.status(404).json({
      success: false,
      message: 'Application not found.'
    });
  }

  res.json({
    success: true,
    message: `Application ${status.toLowerCase()} successfully.`,
    data: application
  });
});
