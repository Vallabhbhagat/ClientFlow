const TeamMember = require("../models/TeamMember.js");
const Task = require("../models/Task.js");
const User = require("../models/User.js");

const getMember = async (req, res) => {
    try {
        const teamMember = await TeamMember.find();

        return res.status(200).json({
            count: teamMember.length,
            data: teamMember
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const addMember = async (req, res) => {
    try {
        const { email, role } = req.body;
        if (!email || !role) {
            return res.status(400).json({ message: "Email and role are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role !== "teamMember") {
            return res.status(400).json({ message: "User is not a team member" });
        }

        const existingMember = await TeamMember.findOne({ userId: user._id });
        if (existingMember) {
            return res.status(400).json({ message: "Team member already exists" });
        }

        const teamMember = await TeamMember.create({
            name: user.name,
            role,
            userId: user._id
        });

        res.status(201).json(teamMember);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMember = async (req, res) => {
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
};

module.exports = { getMember, addMember, deleteMember };