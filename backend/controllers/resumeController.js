const path = require("path");

const {
    extractText
} = require("../services/resumeParser");

const {
    calculateMatch
} = require("../services/analysisService");

async function uploadResumes(req, res) {

    try {

        if (!req.files || req.files.length === 0) {

            return res.status(400).json({
                success: false,
                message: "No resumes uploaded"
            });

        }

        const processedResumes = [];

        for (const file of req.files) {

            const absolutePath =
                path.resolve(file.path);

            const text =
                await extractText(absolutePath);

            processedResumes.push({

                originalName:
                    file.originalname,

                fileName:
                    file.filename,

                filePath:
                    file.path,

                text: text

            });
        }

        res.status(200).json({

            success: true,

            message:
                "Resumes uploaded and processed successfully",

            count:
                processedResumes.length,

            resumes:
                processedResumes

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to process resumes",

            error:
                error.message

        });
    }
}


// ANALYZE RESUMES

async function analyzeResumes(req, res) {

    try {

        const {
            jobDescription,
            resumes
        } = req.body;

        if (!jobDescription || !jobDescription.trim()) {

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

        const candidates = resumes.map((resume) => {

            const analysis =
                calculateMatch(
                    jobDescription,
                    resume.text
                );

            return {

                name:
                    resume.originalName
                        .replace(/\.[^/.]+$/, ""),

                resume:
                    resume.originalName,

                score:
                    analysis.score,

                recommendation:
                    analysis.recommendation,

                matchedSkills:
                    analysis.matchedSkills,

                missingSkills:
                    analysis.missingSkills

            };

        });

        // Highest score first
        candidates.sort(
            (a, b) => b.score - a.score
        );

        res.status(200).json({

            success: true,

            message:
                "Candidates analyzed successfully",

            candidates

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message:
                "Failed to analyze candidates",

            error:
                error.message

        });

    }
}


module.exports = {
    uploadResumes,
    analyzeResumes
};