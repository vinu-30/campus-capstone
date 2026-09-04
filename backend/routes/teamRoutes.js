// Routes for team management.

const router = require('express').Router();

const {
  createTeam,
  getTeams,
  getStudentTeam,
  deleteTeam
} = require('../controllers/teamController');

router.get('/', getTeams);
router.get('/student/:studentId', getStudentTeam);

router.post('/', createTeam);
router.delete('/:id', deleteTeam);

module.exports = router;
