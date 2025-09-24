const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db"); // import the db.js file
const userRoutes = require("./routes/userRoutes");
const wokerRoutes = require('./routes/workerRoutes')
const communityReportRoutes =  require("./routes/communityReportRoutes.js");
const feedbackRoutes =  require("./routes/feedbackRoutes.js");
const AuthorityRoute = require('./routes/authorityAuth.js')
const Module = require("./routes/modulesRouter.js")
const modulesRoutes = require("./routes/modulesRoutes")
const dotenv =  require("dotenv");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONT_END_PORT,
  credentials: true
}));
app.use(express.json());

// Middleware
app.use(cors({
  origin: process.env.FRONT_END_PORT || "http://localhost:3000",
  credentials: true
}));
app.use(express.json());

// Routes - MUST be defined BEFORE app.listen()
app.use("/api/auth", userRoutes);
app.use("/api/auth/worker", wokerRoutes);
app.use("/api/reports", communityReportRoutes);
app.use("/api/worker/feedback", feedbackRoutes);
app.use('/api/auth/authority', AuthorityRoute);
app.use('/api/modules', Module);
app.use('/api/training', modulesRoutes);

// Test Route
// app.get("/", (req, res) => {
//   res.send("API is running and MongoDB is connected 🚀");
// });

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
