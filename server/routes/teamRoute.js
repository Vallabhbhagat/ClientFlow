const express = require("express");
const router = express.Router();
const { adminAuth } = require("../middleware/authMiddleware.js");
const { getMember, addMember, deleteMember } = require("../controllers/teamController.js");

router.get("/", adminAuth, getMember);

router.post("/add", adminAuth, addMember);

router.delete("/:id", adminAuth, deleteMember);


module.exports = router;