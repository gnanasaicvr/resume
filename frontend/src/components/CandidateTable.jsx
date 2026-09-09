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

            {candidates.map((candidate, index) => (

              <tr key={index}>

                <td>
                  <span className="rank">
                    #{index + 1}
                  </span>
                </td>

                <td>
                  <strong className="candidate-name">
                    {candidate.name}
                  </strong>
                </td>

                <td>
                  <span className="resume-name">
                    {candidate.resume}
                  </span>
                </td>

                <td>

                  <div className="score-container">

                    <strong className="score">
                      {candidate.score}%
                    </strong>

                    <div className="score-bar">

                      <div
                        className="score-fill"
                        style={{
                          width: `${candidate.score}%`
                        }}
                      />

                    </div>

                  </div>

                </td>

                <td>

                  <span
                    className={`recommendation ${
                      candidate.recommendation
                        .toLowerCase()
                        .replaceAll(" ", "-")
                    }`}
                  >
                    {candidate.recommendation}
                  </span>

                </td>

                <td>

                  <div className="skills">

                    {candidate.matchedSkills?.length > 0 ? (

                      candidate.matchedSkills.map(
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

                <td>

                  <div className="skills">

                    {candidate.missingSkills?.length > 0 ? (

                      candidate.missingSkills.map(
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

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default CandidateTable;