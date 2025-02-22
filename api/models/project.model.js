const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: { type: String, default: 'In Progress' },
    userId: mongoose.Schema.Types.ObjectId
});

module.exports = mongoose.model('Project', ProjectSchema);
