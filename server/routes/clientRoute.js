const express = require("express");
const router = express.Router();
const { adminAuth } = require("../middleware/authMiddleware.js")
const { getClient, searchClient, addClient, updateClient, deleteClient } = require("../controllers/clientController.js");

router.get("/", adminAuth , getClient);

router.get("/search", adminAuth , searchClient);

router.post("/add", adminAuth , addClient);

router.put("/:id", adminAuth , updateClient);

router.delete("/:id", adminAuth , deleteClient);

module.exports = router;