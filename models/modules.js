const mongoose = require("mongoose");

// Lesson Schema for training modules
const lessonSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

// Training Module Schema
const trainingModuleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true }, // in minutes
  completed: { type: Boolean, default: false },
  points: { type: Number, required: true },
  lessons: [lessonSchema]
});

// User Progress Schema (for tracking individual user progress)
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
  totalPoints: {
    type: Number,
    default: 0,
  },
  completedModules: [{
    moduleId: String,
    completedAt: { type: Date, default: Date.now },
    pointsEarned: Number
  }],
  currentStreak: { type: Number, default: 0 },
  lastActivity: { type: Date, default: Date.now }
});

// Create Models
const TrainingModule = mongoose.model("TrainingModule", trainingModuleSchema);
const Module = mongoose.model("Module", moduleSchema);

module.exports = {
  TrainingModule,
  Module
};
