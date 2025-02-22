const Task = require('../models/task.model');

exports.createTask = async (req, res) => {
    const { title, description, projectId } = req.body;
    const task = new Task({ title, description, projectId });
    await task.save();
    res.status(201).json(task);
};

exports.getTasksByProject = async (req, res) => {
    const tasks = await Task.find({ projectId: req.params.projectId });
    res.json(tasks);
};
