const mongoose = require("mongoose")

const ConnectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log("✅ Database connected")
    } catch (error) {
        console.error("❌ Database connection failed: ",error.message)
        process.exit(1);
    }
};

module.exports = ConnectDB;