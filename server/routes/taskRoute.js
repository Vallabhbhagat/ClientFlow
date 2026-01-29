const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware.js");
const { getTask, getMemberTask, addTask, updateTask } = require("../controllers/taskController.js");

router.get("/", authMiddleware, isAdmin, getTask);

router.get("/with-tasks", authMiddleware, isAdmin, getMemberTask);

router.post("/add", authMiddleware, isAdmin, addTask);

router.put("/:id", authMiddleware, isAdmin, updateTask);

module.exports = router;