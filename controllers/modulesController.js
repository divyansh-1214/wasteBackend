const { TrainingModule, Module } = require("../models/modules");

// ==================== TRAINING MODULES ====================

// Get all training modules
const getAllTrainingModules = async (req, res) => {
  try {
    const modules = await TrainingModule.find();
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get training module by ID
const getTrainingModuleById = async (req, res) => {
  try {
    const module = await TrainingModule.findOne({ id: req.params.id });
    if (!module) {
      return res.status(404).json({ message: "Training module not found" });
    }
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new training module
const createTrainingModule = async (req, res) => {
  try {
    const module = new TrainingModule(req.body);
    await module.save();
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update training module
const updateTrainingModule = async (req, res) => {
  try {
    const module = await TrainingModule.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!module) {
      return res.status(404).json({ message: "Training module not found" });
    }
    res.status(200).json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ==================== USER PROGRESS (Original Module functionality) ====================

// Create/Register user progress
const register = async (req, res) => {
  try {
    const module = await Module.create(req.body);
    res.status(201).json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user progress
const Update = async (req, res) => {
  try {
    const { user, progress } = req.body;
    const module = await Module.findOne({ user: user });
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    module.progress = progress;
    await module.save();
    res.status(200).json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get user progress by ID
const getById = async (req, res) => {
  try {
    const user = req.params.id;
    const module = await Module.findOne({ user: user });
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.status(200).json(module);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Complete a module (add to completed modules and earn points)
const completeModule = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { moduleId, pointsEarned } = req.body;
    
    let userProgress = await Module.findOne({ user: userId });
    if (!userProgress) {
      // Create new progress if doesn't exist
      userProgress = new Module({ user: userId });
    }
    
    // Check if module already completed
    const alreadyCompleted = userProgress.completedModules.find(
      module => module.moduleId === moduleId
    );
    
    if (alreadyCompleted) {
      return res.status(400).json({ message: "Module already completed" });
    }
    
    // Add to completed modules and update total points
    userProgress.completedModules.push({
      moduleId,
      pointsEarned,
      completedAt: new Date()
    });
    userProgress.totalPoints += pointsEarned;
    userProgress.lastActivity = new Date();
    
    await userProgress.save();
    
    res.status(200).json(userProgress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  // Training Modules
  getAllTrainingModules,
  getTrainingModuleById,
  createTrainingModule,
  updateTrainingModule,
  
  // User Progress (original functionality)
  register,
  Update,
  getById,
  completeModule
};
