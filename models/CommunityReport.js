const mongoose = require("mongoose");

const communityReportSchema = new mongoose.Schema({
  author: { type: String, require: true },
  title: { type: String, required: true },
  description: { type: String },
  category: {
    type: String,
    enum: [
      "illegal_dumping",
      "overflowing_bin",
      "missed_collection",
      "overflow_swvage",
      "other",
    ],
    required: true,
  },
  location: { type: String, required: true },
  status: {
    type: String,
    enum: ["pending", "in_progress", "resolved"],
    default: "pending",
  },
  reportedAt: { type: Date, default: Date.now },
  reportedBy: { type: String, required: true },
  imageUrl: { type: String, require },
  priority: { type: String, enum: ["low", "medium", "high"], default: "low" },
  assignedTo: { type: String, default: null }, // workerId or worker name
  assignedBy: { type: String, default: null }, // authority ID
  assignedAt: { type: Date },
});

const CommunityReport = mongoose.model(
  "CommunityReport",
  communityReportSchema
);

module.exports = CommunityReport;
