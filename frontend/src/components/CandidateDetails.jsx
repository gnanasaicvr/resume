import ScoreBadge from "./ScoreBadge";

function CandidateDetails({
  candidate,
  onClose
}) {
  if (!candidate) return null;

  const name =
    candidate.name ||
    candidate.candidateName ||
    "Unknown Candidate";

  const email =
    candidate.email ||
    "Email not available";

  const matchedSkills =
    candidate.matchedSkills || [];

  const missingSkills =
    candidate.missingSkills || [];

  const certifications =
    candidate.certifications || [];

  const projects =
    candidate.projects || [];

  return (
    <div className="details-overlay">

      <div className="details-panel">

        <button
          className="close-button"
          onClick={onClose}
        >
          ×
        </button>

        <div className="details-header">

          <div className="large-avatar">
            {name.charAt(0).toUpperCase()}
          </div>

          <div>

            <h2>
              {name}
            </h2>

            <p>
              {email}
            </p>

          </div>

          <ScoreBadge
            score={candidate.score || 0}
          />

        </div>


        <div className="recommendation-box">

          <h3>
            AI Recommendation
          </h3>

          <p>
            {candidate.aiRecommendation ||
              candidate.recommendation ||
              "No recommendation available"}
          </p>

        </div>


        <div className="details-grid">

          {/* Matched Skills */}

          <div className="details-section">

            <h3>
              Technical Skills
            </h3>

            <div className="tags">

              {matchedSkills.length > 0 ? (

                matchedSkills.map((skill) => (

                  <span
                    className="tag matched"
                    key={skill}
                  >
                    ✓ {skill}
                  </span>

                ))

              ) : (

                <span>
                  None
                </span>

              )}

            </div>

          </div>


          {/* Missing Skills */}

          <div className="details-section">

            <h3>
              Missing Skills
            </h3>

            <div className="tags">

              {missingSkills.length > 0 ? (

                missingSkills.map((skill) => (

                  <span
                    className="tag missing"
                    key={skill}
                  >
                    {skill}
                  </span>

                ))

              ) : (

                <span>
                  None
                </span>

              )}

            </div>

          </div>


          {/* Education */}

          <div className="details-section">

            <h3>
              Education
            </h3>

            <p>
              {candidate.education ||
                "Not available"}
            </p>

          </div>


          {/* Experience */}

          <div className="details-section">

            <h3>
              Experience
            </h3>

            <p>
              {candidate.experience ||
                "Not available"}
            </p>

          </div>


          {/* Certifications */}

          <div className="details-section">

            <h3>
              Certifications
            </h3>

            {certifications.length > 0 ? (

              <ul>

                {certifications.map(
                  (certificate) => (

                    <li key={certificate}>
                      {certificate}
                    </li>

                  )
                )}

              </ul>

            ) : (

              <p>
                None
              </p>

            )}

          </div>


          {/* Projects */}

          <div className="details-section">

            <h3>
              Projects
            </h3>

            {projects.length > 0 ? (

              <ul>

                {projects.map(
                  (project) => (

                    <li key={project}>
                      {project}
                    </li>

                  )
                )}

              </ul>

            ) : (

              <p>
                None
              </p>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default CandidateDetails;