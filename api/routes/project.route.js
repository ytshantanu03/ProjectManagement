const express = require('express');
const { createProject, getProjects } = require('../controllers/project.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();
router.post('/', authMiddleware, createProject);
router.get('/', authMiddleware, getProjects);

module.exports = router;
