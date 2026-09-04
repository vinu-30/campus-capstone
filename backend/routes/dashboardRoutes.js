// Maps the dashboard endpoints to their controller functions.

const router = require('express').Router();

const {
  getDashboardSummary,
  getLeadDashboard
} = require('../controllers/dashboardController');

router.get('/summary', getDashboardSummary);

router.get('/lead', getLeadDashboard);

module.exports = router;

