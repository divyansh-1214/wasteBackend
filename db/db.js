const mongoose = require("mongoose");
const dotenv =  require("dotenv");
// Replace with your MongoDB connection string
dotenv.config();
const MONGO_URI = process.env.MONGO_URI
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Stop app if DB fails
  }
};

module.exports = connectDB;
module.exports = connectDB;
