const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware.js")
const { getProject, addProject, updateProject } = require("../controllers/projectController.js");

router.get("/", authMiddleware, isAdmin, getProject);

router.post("/add", authMiddleware, isAdmin, addProject);

router.put("/:id", authMiddleware, isAdmin, updateProject);


module.exports = router;