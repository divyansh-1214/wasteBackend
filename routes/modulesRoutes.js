const express = require("express");
const router = express.Router();
const {
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
} = require("../controllers/modulesController");

// ==================== TRAINING MODULE ROUTES ====================

// GET /api/modules/training - Get all training modules
router.get("/training", getAllTrainingModules);

// GET /api/modules/training/:id - Get specific training module by ID
router.get("/training/:id", getTrainingModuleById);

// POST /api/modules/training - Create new training module
router.post("/training", createTrainingModule);

// PUT /api/modules/training/:id - Update training module
router.put("/training/:id", updateTrainingModule);

// ==================== USER PROGRESS ROUTES (Original functionality) ====================

// POST /api/modules/register - Register/Create user progress
router.post("/register", register);

// PUT /api/modules/update - Update user progress
router.put("/update", Update);

// GET /api/modules/:id - Get user progress by user ID
router.get("/:id", getById);

// POST /api/modules/:userId/complete - Complete a module and earn points
router.post("/:userId/complete", completeModule);

module.exports = router;