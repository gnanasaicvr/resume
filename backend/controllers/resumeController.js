const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");


// --------------------------------------------------
// Extract text from uploaded resume
// --------------------------------------------------
const extractResumeText = async (file) => {
  const filePath = file.path;
  const extension = path.extname(file.originalname).toLowerCase();

  try {
    // PDF
    if (extension === ".pdf") {
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);

      return data.text || "";
    }

    // DOCX
    if (extension === ".docx") {
      const result = await mammoth.extractRawText({
        path: filePath
      });

      return result.value || "";
    }

    // DOC
    if (extension === ".doc") {
      return "";
    }

    return "";
  } catch (error) {
    console.error(
      `Text extraction failed for ${file.originalname}:`,
      error.message
    );

    return "";
  }
};


// --------------------------------------------------
// Extract skills from Job Description
// --------------------------------------------------
const SKILLS = [
  "javascript",
  "typescript",
  "react",
  "react.js",
  "node.js",
  "node",
  "express",
  "express.js",
  "mongodb",
  "mysql",
  "sql",
  "postgresql",
  "python",
  "java",
  "c",
  "c++",
  "aws",
  "azure",
  "docker",
  "kubernetes",
  "git",
  "github",
  "html",
  "css",
  "tailwind",
  "bootstrap",
  "rest api",
  "rest",
  "api",
  "machine learning",
  "deep learning",
  "artificial intelligence",
  "ai",
  "data science",
  "pandas",
  "numpy",
  "tensorflow",
  "pytorch",
  "figma",
  "communication",
  "leadership",
  "problem solving"
];


const findSkills = (text) => {
  const lowerText = text.toLowerCase();

  return SKILLS.filter((skill) => {
    return lowerText.includes(skill.toLowerCase());
  });
};


// --------------------------------------------------
// Calculate match
// --------------------------------------------------
const calculateMatch = (jobSkills, resumeSkills) => {

  if (jobSkills.length === 0) {
    return {
      score: 0,
      matchedSkills: [],
      missingSkills: []
    };
  }

  const matchedSkills = jobSkills.filter((skill) =>
    resumeSkills.includes(skill)
  );

  const missingSkills = jobSkills.filter(
    (skill) => !resumeSkills.includes(skill)
  );

  const score = Math.round(
    (matchedSkills.length / jobSkills.length) * 100
  );

  return {
    score,
    matchedSkills,
    missingSkills
  };
};


// --------------------------------------------------
// Recommendation
// --------------------------------------------------
const getRecommendation = (score) => {

  if (score >= 85) {
    return "Excellent Match";
  }

  if (score >= 70) {
    return "Strong Match";
  }

  if (score >= 50) {
    return "Moderate Match";
  }

  return "Low Match";
};


// --------------------------------------------------
// Upload resumes
// --------------------------------------------------
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

    console.log(
      `${resumes.length} resume(s) uploaded`
    );

    return res.status(200).json({

      success: true,

      message:
        `${resumes.length} resume(s) uploaded successfully`,

      resumes

    });

  } catch (error) {

    console.error(
      "Upload error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to upload resumes",

      error:
        error.message

    });

  }

};


// --------------------------------------------------
// Analyze resumes
// --------------------------------------------------
const analyzeResumes = async (req, res) => {

  try {

    const {
      jobDescription,
      resumes
    } = req.body;


    // Validate JD
    if (!jobDescription) {

      return res.status(400).json({

        success: false,

        message:
          "Job description is required"

      });

    }


    // Validate resumes
    if (!resumes || resumes.length === 0) {

      return res.status(400).json({

        success: false,

        message:
          "No resumes provided"

      });

    }


    console.log(
      "Starting resume analysis..."
    );


    // --------------------------------------------
    // Extract required skills from JD
    // --------------------------------------------

    const jobSkills =
      findSkills(jobDescription);


    console.log(
      "Required skills:",
      jobSkills
    );


    // --------------------------------------------
    // Analyze every resume
    // --------------------------------------------

    const results = [];


    for (
      let i = 0;
      i < resumes.length;
      i++
    ) {

      const resume = resumes[i];


      // ------------------------------------------
      // Find uploaded file
      // ------------------------------------------

      let filePath =
        resume.path;


      if (
        !filePath &&
        resume.fileName
      ) {

        filePath =
          path.join(
            __dirname,
            "../uploads",
            resume.fileName
          );

      }


      // ------------------------------------------
      // Check file
      // ------------------------------------------

      if (
        !filePath ||
        !fs.existsSync(filePath)
      ) {

        results.push({

          id: i + 1,

          candidateName:
            resume.originalName ||
            `Candidate ${i + 1}`,

          score: 0,

          matchedSkills: [],

          missingSkills:
            jobSkills,

          recommendation:
            "Resume file not found",

          experience:
            "Not available"

        });

        continue;

      }


      // ------------------------------------------
      // Extract resume text
      // ------------------------------------------

      const file = {

        path: filePath,

        originalname:
          resume.originalName ||
          resume.fileName

      };


      const resumeText =
        await extractResumeText(file);


      // ------------------------------------------
      // Find candidate skills
      // ------------------------------------------

      const resumeSkills =
        findSkills(resumeText);


      // ------------------------------------------
      // Calculate score
      // ------------------------------------------

      const match =
        calculateMatch(
          jobSkills,
          resumeSkills
        );


      // ------------------------------------------
      // Create candidate result
      // ------------------------------------------

      results.push({

        id: i + 1,

        candidateName:
          resume.originalName ||
          `Candidate ${i + 1}`,

        score:
          match.score,

        matchedSkills:
          match.matchedSkills,

        missingSkills:
          match.missingSkills,

        recommendation:
          getRecommendation(
            match.score
          ),

        experience:
          "Resume analyzed",

        resumeText:
          resumeText.substring(
            0,
            500
          )

      });

    }


    // --------------------------------------------
    // Rank candidates
    // --------------------------------------------

    results.sort(
      (a, b) =>
        b.score - a.score
    );


    // Reassign rank
    results.forEach(
      (candidate, index) => {

        candidate.rank =
          index + 1;

      }
    );


    console.log(
      "Analysis completed"
    );


    // --------------------------------------------
    // Send response
    // --------------------------------------------

    return res.status(200).json({

      success: true,

      message:
        "Resume analysis completed",

      requiredSkills:
        jobSkills,

      totalCandidates:
        results.length,

      candidates:
        results

    });

  } catch (error) {

    console.error(
      "Analysis error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to analyze resumes",

      error:
        error.message

    });

  }

};


// --------------------------------------------------
// Exports
// --------------------------------------------------

module.exports = {

  uploadResumes,

  analyzeResumes

};