const Task = require("../models/Task.js");
const project = require("../models/Project.js");
const teamMember = require("../models/TeamMember.js");
const User = require("../models/User.js");

const getTask = async (req, res) => {
    try {
        const tasks = await Task.find().populate('projectId', 'name').populate('assignedTo', 'name');
        res.status(200).json({
            count: tasks.length,
            data: tasks
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getMemberTask = async (req, res) => {
    try {
        const members = await Task.aggregate([
            {
                $lookup: {
                    from: "tasks",
                    localField: "_id",
                    foreignField: "assignedTo",
                    as: "tasks"
                }
            }
        ]);

        return res.status(200).json({
            count: members.length,
            data: members
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const addTask = async (req, res) => {
    try {
        const { taskTitle, taskProjectName, taskMemberName, taskStatus } = req.body;

        const projectDetail = await project.findOne({ name: new RegExp(`^${taskProjectName.trim()}$`, 'i') });
        const member = await User.findOne({ name: taskMemberName.trim() });

        if (!taskTitle || !projectDetail || !member) {
            return res.status(400).json({ message: "All fields are required" });
        }


        const task = await Task.create({
            title: taskTitle,
            projectId: projectDetail._id,
            assignedTo: member._id,
            taskStatus
        });

        await task.save();
        res.status(201).json(task);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) return res.status(404).json({ message: 'Not found' });

        return res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id,);

        if (!task) return res.status(404).json({ message: 'Not found' });

        return res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getTask, getMemberTask, addTask, updateTask, deleteTask };