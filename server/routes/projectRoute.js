const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware.js")
const { addProject, updateProject } = require("../controllers/projectController.js");

router.post("/add", authMiddleware, isAdmin, addProject);

router.put("/:id", authMiddleware, isAdmin, updateProject);


module.exports = router;