const Task = require("../models/Task.js");
const TeamMember = require("../models/TeamMember.js");
const User = require("../models/User.js");

const getMyTask = async (req, res) => {

    const member = await User.findById(req.user.userId);

    if (!member) {
        return res.status(404).json({
            message: "Team member not found"
        });
    }

    const tasks = await Task.find({
        assignedTo: member._id
    }).sort({ createdAt: 1 });

    if (tasks.length === 0) {
        return res.status(200).json({
            message: "No task to do",
            data: []
        });
    }

    res.status(200).json({
        count: tasks.length,
        data: tasks
    });

};

const updateMyTask = async (req, res) => {

    const member = await User.findById(req.user.userId);

    if (!member) {
        return res.status(404).json({
            message: "Team member not found"
        });
    }

    const { status } = req.body;

    if (!["To Do", "In progress", "Completed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findOneAndUpdate(
        {
            _id: req.params.taskId,
            assignedTo: member._id
        },
        { status },
        { new: true }
    );

    if (!task) {
        return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
};

module.exports = { getMyTask, updateMyTask }