// Maps student REST endpoints to their controller functions.
const router = require('express').Router();
const controller = require('../controllers/studentController');
router.route('/').get(controller.getStudents).post(controller.createStudent);
router.get('/by-email', controller.getStudentByEmail);
router.route('/:id').get(controller.getStudent).put(controller.updateStudent).delete(controller.deleteStudent);
module.exports = router;
