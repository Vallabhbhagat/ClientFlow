const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js");
const project = require("../models/Project.js");
const teamMember = require("../models/TeamMember.js");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware.js");

router.get("/with-tasks", authMiddleware, isAdmin, async (req, res) => {
    try {
        const members = await teamMember.aggregate([
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
});

router.post("/add", authMiddleware, isAdmin, async (req, res) => {
    try {
        const { title, projectName, memberName, status } = req.body;

        const projectDetail = await project.findOne({ name: projectName });
        const member = await teamMember.findOne({ name: memberName });
        if (!title || !projectDetail || !member) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const task = await Task.create({
            title,
            projectId: projectDetail._id,
            assignedTo: member._id,
            status
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put("/:id", authMiddleware, isAdmin, async (req, res) => {
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
});

module.exports = router;