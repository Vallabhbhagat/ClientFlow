const express = require('express');
const cors = require("cors");
const dotenv = require("dotenv");
const ConnectDB = require("./confi/db.js");
const clientRoute = require("./routes/clientRoute.js");
const projectRoute = require("./routes/projectRoute.js");
const teamRoute = require("./routes/teamRoute.js");
const taskRoute = require("./routes/taskRoute.js");
const authRoute = require("./routes/auth.js");
const memberTaskRoute = require("./routes/memberTaskRoute.js");
const cookieparser = require("cookie-parser");

dotenv.config()
ConnectDB()

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieparser());

app.use("/api/client", clientRoute);
app.use("/api/project", projectRoute);
app.use("/api/team", teamRoute);
app.use("/api/task", taskRoute);
app.use("/api/auth", authRoute);
app.use("/api/membertask", memberTaskRoute);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
})