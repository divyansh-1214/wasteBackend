const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db"); // import the db.js file
const userRoutes = require("./routes/userRoutes");
const wokerRoutes = require('./routes/workerRoutes')
const communityReportRoutes =  require("./routes/communityReportRoutes.js");
const dotenv =  require("dotenv");
const feedbackRoutes =  require("./routes/feedbackRoutes.js");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("API is running and MongoDB is connected 🚀");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


app.use("/api/auth", userRoutes);
app.use("/api/auth/worker", wokerRoutes);
app.use("/api/reports", communityReportRoutes);
app.use("/api/worker/feedback", feedbackRoutes);
