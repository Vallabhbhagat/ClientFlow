const express = require("express");
const router = express.Router();
const Client = require("../models/Client.js")
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware.js")

router.get("/", authMiddleware, isAdmin, async (req, res) => {
    try {
        const clients = await Client.aggregate([
            {
                $lookup: {
                    from: "projects",
                    localField: "_id",
                    foreignField: "clientId",
                    as: "projects"
                }
            }
        ]);

        res.status(200).json({
            count: clients.length,
            data: clients
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get("/search", authMiddleware, isAdmin, async (req, res) => {
    try {
        const name = req.query.name?.trim();

        if (!name) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const clients = await Client.find({ name: { $regex: name, $options: "i" } });

        if (clients.length === 0) {
            return res.status(404).json({ message: "No clients found" });
        }

        return res.status(200).json({
            count: clients.length,
            data: clients
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.post("/add", authMiddleware, isAdmin, async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        const clientExists = await Client.findOne({ email })
        if (clientExists) {
            return res.status(409).json({ message: "client already exist" });
        }

        const client = new Client({
            name,
            email
        });

        await client.save();

        return res.status(201).json(client);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

router.put("/:id", authMiddleware, isAdmin, async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                email: req.body.email
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!client) return res.status(404).json({ message: 'Not found' });

        return res.status(200).json(client);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);

        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        return res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = router;