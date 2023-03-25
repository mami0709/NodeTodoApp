const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    createTasks,
    getSingleTask,
    updataTasks,
    deleteTasks,
} = require('../controllers/tasks'); 

router.get('/', getAllTasks);
router.post('/', createTasks);
router.get('/:id', getSingleTask);
router.patch('/:id', updataTasks);
router.delete('/:id', deleteTasks);

module.exports = router;