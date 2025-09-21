const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  uId: { type: String, required: true }, // unique ID for user/report
  wId: { type: String, required: true }, // unique ID for woker/report
  date: { type: Date, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  behavior: { type: String, enum: ["excellent","good", "average","none","poor"], default: "good" },
  segregationQuality: { type: String, enum: ["excellent", "good", "average", "none","poor"], default: "good" },
  wasteWeight: { type: Number, required: true }, // kg of waste collected
  comments: { type: String }
}, { timestamps: true });

const Feedback = mongoose.model("WorkerFeedback", feedbackSchema);

module.exports = Feedback
