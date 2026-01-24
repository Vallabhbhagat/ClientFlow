const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware.js");
const { getMember, addMember, deleteMember } = require("../controllers/teamController.js");

router.get("/", authMiddleware, isAdmin, getMember);

router.post("/add", authMiddleware, isAdmin, addMember);

router.delete("/:id", authMiddleware, isAdmin, deleteMember);


module.exports = router;