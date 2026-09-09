const express = require("express");

const upload =
    require("../middleware/uploadMiddleware");

const {
    uploadResumes,
    analyzeResumes
} = require("../controllers/resumeController");

const router = express.Router();


// Upload resumes
router.post(
    "/upload",
    upload.array("resumes", 100),
    uploadResumes
);


// Analyze candidates
router.post(
    "/analyze",
    analyzeResumes
);


module.exports = router;