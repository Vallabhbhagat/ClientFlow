const express = require("express");
const router = express.Router();
const { analyzeProject, getAllProjectsAnalysis } = require("../controllers/projectInsightsController");
const { adminAuth } = require("../middleware/authMiddleware");

router.get("/project/:id", adminAuth, async (req, res) => {
  try {
    const analysis = await analyzeProject(req.params.id);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/all", adminAuth, async (req, res) => {
  try {
    const analyses = await getAllProjectsAnalysis();
    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;