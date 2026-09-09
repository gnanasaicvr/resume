function CandidateTable({ candidates }) {
  if (!candidates || candidates.length === 0) {
    return null;
  }

  return (
    <div className="candidate-table-container">

      <div className="table-header">

        <div>
          <h2>Candidate Results</h2>

          <p>
            Candidates ranked according to the job requirements.
          </p>
        </div>

        <div className="candidate-count">
          {candidates.length} Candidates
        </div>

      </div>


      <div className="table-wrapper">

        <table className="candidate-table">

          <thead>

            <tr>
              <th>Rank</th>
              <th>Candidate</th>
              <th>Resume</th>
              <th>Match Score</th>
              <th>Recommendation</th>
              <th>Matched Skills</th>
              <th>Missing Skills</th>
            </tr>

          </thead>


          <tbody>

            {candidates.map((candidate, index) => {

              // Support both frontend and backend field names
              const candidateName =
                candidate.name ||
                candidate.candidateName ||
                "Unknown Candidate";

              const resumeName =
                candidate.resume ||
                candidate.originalName ||
                candidate.fileName ||
                "Resume";

              const recommendation =
                candidate.recommendation ||
                candidate.aiRecommendation ||
                "Pending analysis";

              const score =
                Number(candidate.score) || 0;

              const matchedSkills =
                candidate.matchedSkills || [];

              const missingSkills =
                candidate.missingSkills || [];


              return (

                <tr
                  key={candidate.id || index}
                >

                  {/* Rank */}

                  <td>

                    <span className="rank">
                      #{index + 1}
                    </span>

                  </td>


                  {/* Candidate Name */}

                  <td>

                    <strong className="candidate-name">
                      {candidateName}
                    </strong>

                  </td>


                  {/* Resume */}

                  <td>

                    <span className="resume-name">
                      {resumeName}
                    </span>

                  </td>


                  {/* Match Score */}

                  <td>

                    <div className="score-container">

                      <strong className="score">
                        {score}%
                      </strong>

                      <div className="score-bar">

                        <div
                          className="score-fill"
                          style={{
                            width: `${score}%`
                          }}
                        />

                      </div>

                    </div>

                  </td>


                  {/* Recommendation */}

                  <td>

                    <span
                      className={`recommendation ${
                        recommendation
                          .toLowerCase()
                          .replaceAll(" ", "-")
                      }`}
                    >
                      {recommendation}
                    </span>

                  </td>


                  {/* Matched Skills */}

                  <td>

                    <div className="skills">

                      {matchedSkills.length > 0 ? (

                        matchedSkills.map(
                          (skill, skillIndex) => (

                            <span
                              key={skillIndex}
                              className="skill-tag matched-tag"
                            >
                              {skill}
                            </span>

                          )
                        )

                      ) : (

                        <span className="none">
                          None
                        </span>

                      )}

                    </div>

                  </td>


                  {/* Missing Skills */}

                  <td>

                    <div className="skills">

                      {missingSkills.length > 0 ? (

                        missingSkills.map(
                          (skill, skillIndex) => (

                            <span
                              key={skillIndex}
                              className="skill-tag missing-tag"
                            >
                              {skill}
                            </span>

                          )
                        )

                      ) : (

                        <span className="none">
                          None
                        </span>

                      )}

                    </div>

                  </td>

                </tr>

              );

            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CandidateTable;