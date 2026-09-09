function normalizeText(text) {
    return text
        .toLowerCase()
        .replace(/[^\w\s+#.-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();
}


// Skill groups
// Each group represents one actual skill.
const skillGroups = [
    {
        name: "Java",
        keywords: ["java"]
    },
    {
        name: "Python",
        keywords: ["python"]
    },
    {
        name: "JavaScript",
        keywords: ["javascript", "js"]
    },
    {
        name: "React",
        keywords: ["react", "react.js", "reactjs"]
    },
    {
        name: "HTML",
        keywords: ["html"]
    },
    {
        name: "CSS",
        keywords: ["css"]
    },
    {
        name: "SQL",
        keywords: ["sql", "mysql", "postgresql", "postgres"]
    },
    {
        name: "REST API",
        keywords: [
            "rest api",
            "rest apis",
            "restful api",
            "restful apis"
        ]
    },
    {
        name: "Git",
        keywords: ["git"]
    },
    {
        name: "GitHub",
        keywords: ["github"]
    },
    {
        name: "Spring Boot",
        keywords: ["spring boot"]
    },
    {
        name: "Node.js",
        keywords: ["node.js", "nodejs", "node js"]
    },
    {
        name: "Express.js",
        keywords: [
            "express.js",
            "expressjs",
            "express js"
        ]
    },
    {
        name: "MongoDB",
        keywords: ["mongodb", "mongo db"]
    },
    {
        name: "Data Structures",
        keywords: [
            "data structures",
            "data structure"
        ]
    },
    {
        name: "Algorithms",
        keywords: [
            "algorithms",
            "algorithm"
        ]
    },
    {
        name: "Object-Oriented Programming",
        keywords: [
            "object oriented programming",
            "object-oriented programming",
            "oop"
        ]
    }
];


// Check whether a skill exists in text
function containsSkill(text, keywords) {

    return keywords.some(keyword => {

        const escaped =
            keyword
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const regex =
            new RegExp(
                `(^|\\s)${escaped}(?=\\s|$|[,.])`,
                "i"
            );

        return regex.test(text);
    });
}


// Extract skills from job description
function extractRequiredSkills(jobDescription) {

    const jd =
        normalizeText(jobDescription);

    return skillGroups.filter(skill =>
        containsSkill(jd, skill.keywords)
    );
}


// Calculate resume match
function calculateMatch(
    jobDescription,
    resumeText
) {

    const requiredSkills =
        extractRequiredSkills(
            jobDescription
        );

    const resume =
        normalizeText(resumeText);


    const matchedSkills =
        requiredSkills.filter(skill =>
            containsSkill(
                resume,
                skill.keywords
            )
        );


    const missingSkills =
        requiredSkills.filter(skill =>
            !containsSkill(
                resume,
                skill.keywords
            )
        );


    let score = 0;


    if (requiredSkills.length > 0) {

        score =
            Math.round(
                (
                    matchedSkills.length /
                    requiredSkills.length
                ) * 100
            );
    }


    let recommendation =
        "Low Match";


    if (score >= 80) {

        recommendation =
            "Excellent Match";

    } else if (score >= 60) {

        recommendation =
            "Good Match";

    } else if (score >= 40) {

        recommendation =
            "Average Match";
    }


    return {

        score,

        recommendation,

        matchedSkills:
            matchedSkills.map(
                skill => skill.name
            ),

        missingSkills:
            missingSkills.map(
                skill => skill.name
            )
    };
}


module.exports = {
    calculateMatch
};