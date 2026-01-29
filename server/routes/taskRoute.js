const express = require("express");
const router = express.Router();
const { adminAuth } = require("../middleware/authMiddleware.js");
const { getTask, getMemberTask, addTask, updateTask, deleteTask } = require("../controllers/taskController.js");

router.get("/", adminAuth, getTask);

router.get("/with-tasks", adminAuth, getMemberTask);

router.post("/add", adminAuth, addTask);

router.put("/:id", adminAuth, updateTask);

router.delete("/:id", adminAuth, deleteTask);

module.exports = router;