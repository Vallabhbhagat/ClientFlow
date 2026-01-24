const express = require("express");
const router = express.Router();
const TeamMember = require("../models/TeamMember.js");
const Task = require("../models/Task.js");

router.get("/", async (req, res) => {
    try {
        const teamMember = await TeamMember.find();

        return res.status(200).json({
            count: teamMember.length,
            data: teamMember
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post("/add", async (req, res) => {
    try {
        const { name, role } = req.body;
        if (!name && !role) {
            return res.status(400).json({ message: "Name and role are required" });
        }

        const teamMember = await TeamMember.create({
            name,
            role
        });

        res.status(201).json(teamMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const memberId = req.params.id;

        const taskCount = await Task.countDocuments({ assignedTo: memberId });
        if (taskCount > 0) {
            return res.status(400).json({
                message: "Member has assigned tasks. Reassign tasks before deleting."
            });
        }

        const member = await TeamMember.findByIdAndDelete(memberId);
        if (!member) {
            return res.status(404).json({ message: "Member not found" });
        }

        res.status(200).json({ message: "Member deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router;