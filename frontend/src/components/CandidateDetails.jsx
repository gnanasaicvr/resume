import ScoreBadge from "./ScoreBadge";

function CandidateDetails({
  candidate,
  onClose
}) {

  if (!candidate) return null;

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
            {candidate.name.charAt(0)}
          </div>

          <div>

            <h2>
              {candidate.name}
            </h2>

            <p>
              {candidate.email}
            </p>

          </div>

          <ScoreBadge
            score={candidate.score}
          />

        </div>

        <div className="recommendation-box">

          <h3>
            AI Recommendation
          </h3>

          <p>
            {candidate.aiRecommendation}
          </p>

        </div>

        <div className="details-grid">

          <div className="details-section">

            <h3>Technical Skills</h3>

            <div className="tags">

              {candidate.matchedSkills.map(
                (skill) => (
                  <span
                    className="tag matched"
                    key={skill}
                  >
                    ✓ {skill}
                  </span>
                )
              )}

            </div>

          </div>

          <div className="details-section">

            <h3>Missing Skills</h3>

            <div className="tags">

              {candidate.missingSkills.map(
                (skill) => (
                  <span
                    className="tag missing"
                    key={skill}
                  >
                    {skill}
                  </span>
                )
              )}

            </div>

          </div>

          <div className="details-section">

            <h3>Education</h3>

            <p>
              {candidate.education}
            </p>

          </div>

          <div className="details-section">

            <h3>Experience</h3>

            <p>
              {candidate.experience}
            </p>

          </div>

          <div className="details-section">

            <h3>Certifications</h3>

            <ul>

              {candidate.certifications.map(
                (certificate) => (
                  <li key={certificate}>
                    {certificate}
                  </li>
                )
              )}

            </ul>

          </div>

          <div className="details-section">

            <h3>Projects</h3>

            <ul>

              {candidate.projects.map(
                (project) => (
                  <li key={project}>
                    {project}
                  </li>
                )
              )}

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CandidateDetails;