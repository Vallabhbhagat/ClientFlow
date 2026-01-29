const Project = require("../models/Project.js");
const Client = require("../models/Client.js")

const getProject = async (req, res) => {
    try {
        const projects = await Project.find().populate('clientId', 'name email');
        res.status(200).json({
            count: projects.length,
            data: projects
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addProject = async (req, res) => {
    try {
        const { name, clientEmail, status } = req.body;

        if (!clientEmail || !name) {
            return res.status(400).json({ message: "Project name and clientEmail are required" });
        }

        const client = await Client.findOne({ email: clientEmail });
        if (!client) {
            return res.status(404).json({ message: "Client does not exist" });
        }

        const exists = await Project.findOne({ name, clientId: client._id });
        if (exists) {
            return res.status(409).json({ message: "Project already exists for this client" });
        }

        const project = new Project({
            clientId: client._id,
            name,
            status
        });

        await project.save();
        return res.status(201).json({ message: "Project added", project });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const updateProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!project) return res.status(404).json({ message: 'Not found' });

        return res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProject = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id,);

        if (!project) return res.status(404).json({ message: 'Not found' });

        return res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getProject, addProject, updateProject, deleteProject };