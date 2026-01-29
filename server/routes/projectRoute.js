const express = require("express");
const router = express.Router();
const { adminAuth } = require("../middleware/authMiddleware.js")
const { getProject, addProject, updateProject, deleteProject } = require("../controllers/projectController.js");

router.get("/", adminAuth, getProject);

router.post("/add", adminAuth, addProject);

router.put("/:id", adminAuth, updateProject);

router.delete("/:id", adminAuth, deleteProject);

module.exports = router;