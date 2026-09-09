import { useState } from "react";

import Navbar from "../components/Navbar";
import JobDescription from "../components/JobDescription";
import ResumeUpload from "../components/ResumeUpload";
import CandidateTable from "../components/CandidateTable";

import { analyzeCandidates } from "../services/api";


function Home() {

  // Job description entered by recruiter
  const [jobDescription, setJobDescription] = useState("");

  // Original files selected by recruiter
  const [files, setFiles] = useState([]);

  // Resumes processed by backend
  const [uploadedResumes, setUploadedResumes] = useState([]);

  // Analysis results
  const [results, setResults] = useState([]);

  // Analyze button loading state
  const [analyzing, setAnalyzing] = useState(false);


  // ==========================================
  // ANALYZE CANDIDATES
  // ==========================================

  const handleAnalyze = async () => {

    // Check Job Description
    if (!jobDescription.trim()) {

      alert("Please enter a job description.");

      return;
    }


    // Check selected resumes
    if (files.length === 0) {

      alert("Please upload at least one resume.");

      return;
    }


    // Check whether resumes were uploaded
    if (uploadedResumes.length === 0) {

      alert("Please click Upload Resumes first.");

      return;
    }


    try {

      setAnalyzing(true);

      setResults([]);


      console.log(
        "Job Description:",
        jobDescription
      );


      console.log(
        "Uploaded Resumes:",
        uploadedResumes
      );


      // Send JD + processed resumes to backend
      const result = await analyzeCandidates(
        jobDescription,
        uploadedResumes
      );


      console.log(
        "Analysis result:",
        result
      );


      if (result.success) {

        setResults(
          result.candidates || []
        );

      } else {

        alert(
          result.message ||
          "Analysis failed."
        );

      }


    } catch (error) {

      console.error(
        "Analysis error:",
        error
      );


      alert(
        error.response?.data?.message ||
        "Failed to analyze candidates."
      );


    } finally {

      setAnalyzing(false);

    }

  };


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div>

      <Navbar />


      <main className="main-container">


        {/* =========================
            HERO SECTION
        ========================== */}

        <div className="hero">

          <div className="hero-badge">
            AI-POWERED RECRUITMENT
          </div>


          <h1>

            Find the right candidate

            <br />

            <span>
              in seconds.
            </span>

          </h1>


          <p>

            Upload a job description and
            candidate resumes.

            Our intelligent screening assistant
            analyzes, matches, and ranks
            candidates automatically.

          </p>

        </div>


        {/* =========================
            INPUT SECTIONS
        ========================== */}

        <div className="steps">


          {/* JOB DESCRIPTION */}

          <JobDescription
            onChange={setJobDescription}
          />


          {/* RESUME UPLOAD */}

          <ResumeUpload

            onFilesChange={setFiles}

            onUploadComplete={
              setUploadedResumes
            }

          />

        </div>


        {/* =========================
            ANALYZE SECTION
        ========================== */}

        <div className="analyze-section">


          <button

            className="analyze-button"

            onClick={handleAnalyze}

            disabled={analyzing}

          >

            {analyzing
              ? "Analyzing..."
              : "Analyze Candidates"
            }


            {!analyzing && (
              <span>→</span>
            )}

          </button>


          <p>

            AI will extract skills,
            compare candidates,
            and generate
            recommendations.

          </p>

        </div>


        {/* =========================
            CANDIDATE TABLE
        ========================== */}

        {results.length > 0 && (

          <CandidateTable
            candidates={results}
          />

        )}


      </main>

    </div>

  );

}


export default Home;