const Project = require('../models/project.model');

exports.createProject = async (req, res) => {
    const { title, description } = req.body;
    const project = new Project({ title, description, userId: req.user._id });
    await project.save();
    res.status(201).json(project);
};

exports.getProjects = async (req, res) => {
    const projects = await Project.find({ userId: req.user._id });
    res.json(projects);
};
