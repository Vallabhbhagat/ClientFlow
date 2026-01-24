const express = require("express");
const router = express.Router();
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware.js")
const { getClient, searchClient, addClient, updateClient, deleteClient } = require("../controllers/clientController.js");

router.get("/", authMiddleware, isAdmin, getClient);

router.get("/search", authMiddleware, isAdmin, searchClient);

router.post("/add", authMiddleware, isAdmin, addClient);

router.put("/:id", authMiddleware, isAdmin, updateClient);

router.delete("/:id", authMiddleware, isAdmin, deleteClient);

module.exports = router;