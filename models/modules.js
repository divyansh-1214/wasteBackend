const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  progress: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
