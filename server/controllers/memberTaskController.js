const Task = require("../models/Task.js");

const getMyTask = async (req, res) => {

    const task = await Task.findOne({
        assignedTo: req.user.userId,
        status: { $ne: "Completed" }
    }).sort({ createdAt: 1 });

    if (!task) {
        return res.status(200).json({
            message: "No task to do"
        });
    }

    res.status(200).json(task);
};

const updateMyTask = async (req, res) => {

    const { status } = req.body;

    if (!["In Progress", "Completed"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findOneAndUpdate(
        {
            _id: req.params.taskId,
            assignedTo: req.user.userId
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