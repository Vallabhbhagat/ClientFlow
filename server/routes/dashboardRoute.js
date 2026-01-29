const express = require("express");
const router = express.Router();
const { adminAuth, memberAuth } = require("../middleware/auth");

// Admin dashboard API
router.get("/admin-dashboard", adminAuth, (req, res) => {
    res.json({ message: "Welcome Admin!", user: req.user });
});

// Member dashboard API
router.get("/member-dashboard", memberAuth, (req, res) => {
    res.json({ message: "Welcome Member!", user: req.user });
});

module.exports = router;
