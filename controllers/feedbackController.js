const Feedback  =  require("../models/WorkerFeedback.js");

// @desc    Create feedback
const createFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.create(req.body);
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all feedback
 const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get feedback by ID
 const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update feedback
 const updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete feedback
 const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: "Feedback not found" });
    res.json({ message: "Feedback deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc Assign a community report to a worker
const assignReport = async (req, res) => {
  try {
    const { workerId, authorityId } = req.body;

    const report = await CommunityReport.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    report.assignedTo = workerId;
    report.assignedBy = authorityId;
    report.assignedAt = new Date();
    report.status = "in_progress";

    await report.save();

    res.json({ message: "Report assigned successfully", report });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports =  {assignReport, deleteFeedback,createFeedback,updateFeedback,getFeedbackById,getFeedbacks}