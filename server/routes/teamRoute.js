const express = require("express");
const router = express.Router();
const TeamMember = require("../models/TeamMember.js");

router.post("/add", async (req, res) => {
    try {
        const {name , role} = req.body;
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

module.exports = router;