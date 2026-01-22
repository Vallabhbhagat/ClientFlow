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
        return res.status(500).json({ error: error.message })
    }

});

module.exports = router;