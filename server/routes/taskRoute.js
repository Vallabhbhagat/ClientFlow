const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js");
const project = require("../models/Project.js");
const teamMember = require("../models/TeamMember.js");

router.post("/add", async (req, res) => {
    try {
        const { title, projectName, memberName } = req.body;

        const projectDetail = await project.findOne({ name: projectName });
        const member = await teamMember.findOne({ name: memberName });
        if (!title || !projectDetail || !member) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const task = await Task.create({
            title,
            projectId: projectDetail._id,
            assignedTo: member._id
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;