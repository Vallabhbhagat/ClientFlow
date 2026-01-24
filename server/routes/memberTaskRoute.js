const express = require("express");
const router = express.Router();
const { authMiddleware, isMember } = require("../middleware/authMiddleware.js")
const { getMyTask, updateMyTask } = require("../controllers/memberTaskController.js");

router.get("/my-task", authMiddleware, isMember, getMyTask);

router.put("/my-task/:taskId", authMiddleware, isMember, updateMyTask);

module.exports = router;