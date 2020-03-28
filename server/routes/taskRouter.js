const router = require('express').Router();

const {createTask} = require('../controllers/task/tasks');
const {getTasks} = require('../controllers/task/tasks');
const {changeTask} = require('../controllers/task/tasks');
const {deleteTask} = require('../controllers/task/tasks');
const {findTasks} = require('../controllers/task/tasks');
router.post('/create', createTask);
router.get('/getTasks', getTasks);
router.put('/changeTask', changeTask);
router.delete('/deleteTask/:id,:user', deleteTask);
router.get('/findTasks/:subject', findTasks);

module.exports = router;
