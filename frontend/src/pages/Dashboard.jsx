import { useState } from "react";
import Navbar from "../components/Navbar";
import CandidateTable from "../components/CandidateTable";
import CandidateDetails from "../components/CandidateDetails";

const sampleCandidates = [
  {
    id: 1,
    name: "Rahul Kumar",
    email: "rahul@example.com",
    score: 92,
    experience: "1 year",
    education: "B.Tech Computer Science",
    matchedSkills: [
      "Java",
      "Spring Boot",
      "SQL",
      "REST API",
      "Git"
    ],
    missingSkills: [
      "Docker"
    ],
    certifications: [
      "AWS Cloud Practitioner"
    ],
    projects: [
      "Banking Management System",
      "Employee Management API"
    ],
    recommendation: "Strong Candidate",
    aiRecommendation:
      "Rahul is a strong match for this position. He has most of the required technical skills, relevant internship experience, and projects involving Java and Spring Boot."
  },

  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    score: 87,
    experience: "2 years",
    education: "B.Tech Information Technology",
    matchedSkills: [
      "Java",
      "SQL",
      "Spring Boot",
      "Git"
    ],
    missingSkills: [
      "REST API"
    ],
    certifications: [
      "Java Programming Certification"
    ],
    projects: [
      "E-Commerce Backend",
      "Student Portal"
    ],
    recommendation: "Strong Candidate",
    aiRecommendation:
      "Priya has strong Java development experience and good knowledge of Spring Boot and SQL. She is suitable for the role with a minor skill gap in REST API development."
  },

  {
    id: 3,
    name: "Arjun Reddy",
    email: "arjun@example.com",
    score: 78,
    experience: "1 year",
    education: "B.E. Computer Science",
    matchedSkills: [
      "Java",
      "SQL",
      "Git"
    ],
    missingSkills: [
      "Spring Boot",
      "REST API"
    ],
    certifications: [
      "Oracle Java Certification"
    ],
    projects: [
      "Library Management System"
    ],
    recommendation: "Consider",
    aiRecommendation:
      "Arjun has a good foundation in Java and SQL but lacks some of the backend technologies required for this role."
  },

  {
    id: 4,
    name: "Kiran Kumar",
    email: "kiran@example.com",
    score: 61,
    experience: "6 months",
    education: "B.Tech CSE",
    matchedSkills: [
      "Java",
      "SQL"
    ],
    missingSkills: [
      "Spring Boot",
      "REST API",
      "Git"
    ],
    certifications: [],
    projects: [
      "College Management System"
    ],
    recommendation: "Consider",
    aiRecommendation:
      "Kiran is an entry-level candidate with basic Java and SQL knowledge. Additional backend development skills would be required."
  }
];

function Dashboard({ onBack }) {

  const [selectedCandidate, setSelectedCandidate] =
    useState(null);

  return (
    <div>

      <Navbar />

      <main className="dashboard-container">

        <div className="dashboard-header">

          <div>

            <button
              className="back-button"
              onClick={onBack}
            >
              ← Back
            </button>

            <h1>
              Candidate Dashboard
            </h1>

            <p>
              Java Backend Developer
            </p>

          </div>

          <div className="dashboard-actions">

            <button className="secondary-button">
              Export Results
            </button>

            <button
              className="primary-button"
              onClick={onBack}
            >
              New Screening
            </button>

          </div>

        </div>

        <div className="stats-grid">

          <div className="stat-card">

            <span>Total Resumes</span>

            <strong>
              100
            </strong>

            <small>
              Successfully processed
            </small>

          </div>

          <div className="stat-card">

            <span>Strong Candidates</span>

            <strong>
              24
            </strong>

            <small>
              Score above 80%
            </small>

          </div>

          <div className="stat-card">

            <span>Average Score</span>

            <strong>
              76%
            </strong>

            <small>
              Across all candidates
            </small>

          </div>

          <div className="stat-card">

            <span>Processing Time</span>

            <strong>
              42 sec
            </strong>

            <small>
              AI screening completed
            </small>

          </div>

        </div>

        <div className="dashboard-card">

          <div className="dashboard-card-header">

            <div>
              <h2>
                Candidate Rankings
              </h2>

              <p>
                Candidates ranked based on job requirements
              </p>
            </div>

            <div className="filter">
              All Candidates ▾
            </div>

          </div>

          <CandidateTable
            candidates={sampleCandidates}
            onCandidateSelect={setSelectedCandidate}
          />

        </div>

      </main>

      <CandidateDetails
        candidate={selectedCandidate}
        onClose={() =>
          setSelectedCandidate(null)
        }
      />

    </div>
  );
}

export default Dashboard;