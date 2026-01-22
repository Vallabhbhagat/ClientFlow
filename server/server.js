const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectDB = require("./confi/db.js");

dotenv.config()
ConnectDB()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.listen(PORT ,() =>{
    console.log(`Server is running at http://localhost:${PORT}`);
})