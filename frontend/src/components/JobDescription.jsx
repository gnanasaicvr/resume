import { useState } from "react";

function JobDescription({ onChange }) {

  const [description, setDescription] = useState("");

  const handleChange = (event) => {

    const value = event.target.value;

    setDescription(value);

    onChange(value);
  };

  return (
    <div className="card">

      <div className="section-header">

        <div>
          <h2>Job Description</h2>

          <p>
            Enter the requirements for the position.
          </p>
        </div>

        <span className="step-number">01</span>

      </div>

      <textarea
        className="job-textarea"
        placeholder={`Example:

Job Role: Java Backend Developer

Required Skills:
• Java
• Spring Boot
• SQL
• REST API
• Git

Experience: 0-2 years
Education: B.Tech / B.E.`}
        value={description}
        onChange={handleChange}
      />

      <div className="character-count">
        {description.length} characters
      </div>

    </div>
  );
}

export default JobDescription;