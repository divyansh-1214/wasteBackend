const CommunityReport =  require("../models/CommunityReport.js");

// @desc    Create a new report
 const createReport = async (req, res) => {
  try {
    const report = await CommunityReport.create(req.body);
    res.status(201).json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all reports
 const getReports = async (req, res) => {
  try {
    const reports = await CommunityReport.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single report by ID
 const getReportById = async (req, res) => {
  try {
    const report = await CommunityReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a report
 const updateReport = async (req, res) => {
  try {
    const report = await CommunityReport.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a report
 const deleteReport = async (req, res) => {
  try {
    const report = await CommunityReport.findByIdAndDelete(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {deleteReport,updateReport, getReportById, getReports, createReport}