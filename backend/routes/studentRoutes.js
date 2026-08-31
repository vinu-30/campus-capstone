// Maps student REST endpoints to their controller functions.
const router = require('express').Router();
const controller = require('../controllers/studentController');
router.route('/').get(controller.getStudents).post(controller.createStudent);
router.route('/:id').get(controller.getStudent).put(controller.updateStudent).delete(controller.deleteStudent);
module.exports = router;
