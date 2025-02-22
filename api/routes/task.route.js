const express = require('express');
const { createTask, getTasksByProject } = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();
router.post('/', authMiddleware, createTask);
router.get('/:projectId', authMiddleware, getTasksByProject);

module.exports = router;
