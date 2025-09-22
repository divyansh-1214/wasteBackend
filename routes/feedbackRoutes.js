const express = require("express");
const route =  require( "../controllers/feedbackController.js");

const router = express.Router();

router.post("/", route.createFeedback);      // Create new feedback
router.get("/", route.getFeedbacks);         // Get all feedback
router.get("/:id", route.getFeedbackById);   // Get feedback by ID
router.put("/:id", route.updateFeedback);    // Update feedback
router.delete("/:id", route.deleteFeedback); // Delete feedback
router.put("/:id/assign", route.assignReport);
module.exports = router;
