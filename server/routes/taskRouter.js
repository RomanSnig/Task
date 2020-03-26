const router = require('express').Router();

const {createTask} = require('../controllers/task/tasks');
const {getTasks} = require('../controllers/task/tasks');

router.post('/create', createTask);
router.get('/getTasks', getTasks);

module.exports = router;
