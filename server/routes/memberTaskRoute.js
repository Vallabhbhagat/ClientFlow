const express = require("express");
const router = express.Router();
const { memberAuth } = require("../middleware/authMiddleware.js")
const { getMyTask, updateMyTask } = require("../controllers/memberTaskController.js");

router.get("/my-task", memberAuth, getMyTask);

router.put("/my-task/:taskId", memberAuth, updateMyTask);

module.exports = router;