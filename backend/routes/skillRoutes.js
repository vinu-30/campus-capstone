const router = require('express').Router();
const controller = require('../controllers/skillController');
router.route('/').get(controller.getSkills).post(controller.createSkill);
router.delete('/:id', controller.deleteSkill);
module.exports = router;
