// Maps the dashboard summary endpoint to its controller.
const router = require('express').Router();
const { getDashboardSummary } = require('../controllers/dashboardController');
router.get('/summary', getDashboardSummary);
module.exports = router;
