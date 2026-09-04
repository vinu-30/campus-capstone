// Routes for student project applications.

const router = require('express').Router();

const {
  getApplications,
  createApplication,
  updateApplicationStatus
} = require('../controllers/applicationController');

router.get('/', getApplications);

router.post('/', createApplication);

router.patch('/:id/status', updateApplicationStatus);

module.exports = router;