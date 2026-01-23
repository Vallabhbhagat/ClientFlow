const express = require("express");
const router = express.Router();
const Client = require("../models/Client.js")

router.post("/add", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        
        if (!client) {
            return res.status(404).json({ message: "Client not found" });
        }

        return res.status(200).json({ message: "Client deleted successfully" });
    } catch (error) {
        res.json({message: error.message});
    }
});

module.exports = router;