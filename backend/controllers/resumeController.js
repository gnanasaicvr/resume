const path = require("path");

const uploadResumes = async (req, res) => {
  try {
    console.log("Upload request received");

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No resumes uploaded"
      });
    }

    const resumes = req.files.map((file) => {
      return {
        originalName: file.originalname,
        fileName: file.filename,
        path: file.path,
        url: `/uploads/${file.filename}`,
        size: file.size,
        mimetype: file.mimetype
      };
    });

    console.log("Uploaded files:", resumes);

    return res.status(200).json({
      success: true,
      message: `${resumes.length} resume(s) uploaded successfully`,
      resumes
    });

  } catch (error) {
    console.error("Upload error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload resumes",
      error: error.message
    });
  }
};


const analyzeResumes = async (req, res) => {
  try {
    const {
      jobDescription,
      resumes
    } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job description is required"
      });
    }

    if (!resumes || resumes.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No resumes provided"
      });
    }

    console.log("Job Description:", jobDescription);
    console.log("Resumes:", resumes);

    /*
      Add your AI resume analysis logic here.
    */

    const results = resumes.map((resume, index) => {
      return {
        id: index + 1,
        candidateName:
          resume.originalName || `Candidate ${index + 1}`,
        score: 0,
        skills: [],
        experience: "Not analyzed yet",
        recommendation: "Pending analysis"
      };
    });

    return res.status(200).json({
      success: true,
      message: "Resume analysis completed",
      candidates: results
    });

  } catch (error) {
    console.error("Analysis error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to analyze resumes",
      error: error.message
    });
  }
};


module.exports = {
  uploadResumes,
  analyzeResumes
};