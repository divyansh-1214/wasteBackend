const express =  require("express");

const route = require("../controllers/WorkerReportController.js")

const router = express.Router();

router.post("/", route.createReport);       // Create new report
router.get("/", route.getReports);          // Get all reports
router.get("/:id", route.getReportById);    // Get report by ID
router.put("/:id", route.updateReport);     // Update report
router.delete("/:id", route.deleteReport);  // Delete report

module.exports = router;
