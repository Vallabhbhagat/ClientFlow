const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectDB = require("./confi/db.js");
const clientRoute = require("./routes/clientRoute.js")

dotenv.config()
ConnectDB()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/client",clientRoute);

app.listen(PORT ,() =>{
    console.log(`Server is running at http://localhost:${PORT}`);
})