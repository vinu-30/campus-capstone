// Maps project REST endpoints to their controller functions.
const router = require('express').Router();
const controller = require('../controllers/projectController');
router.route('/').get(controller.getProjects).post(controller.createProject);
router.route('/:id').get(controller.getProject).put(controller.updateProject).delete(controller.deleteProject);
module.exports = router;
