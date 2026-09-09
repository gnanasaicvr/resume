import { useState } from "react";
import { uploadResumes } from "../services/api";

function ResumeUpload({ onFilesChange, onUploadComplete }) {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);

    const validFiles = selectedFiles.filter(
      (file) =>
        file.name.toLowerCase().endsWith(".pdf") ||
        file.name.toLowerCase().endsWith(".docx")
    );

    setFiles(validFiles);

    // Send selected files to Home.jsx
    onFilesChange(validFiles);

    setMessage("");
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setMessage("Please select at least one resume.");
      return;
    }

    try {
      setUploading(true);
      setMessage("");

      const result = await uploadResumes(files);

      console.log("Upload response:", result);

      // Send processed resumes to Home.jsx
      if (result.resumes) {
        onUploadComplete(result.resumes);
      }

      setMessage(
        `${files.length} resume(s) uploaded successfully!`
      );

      // DO NOT clear files here.
      // Analyze Candidates still needs them.

    } catch (error) {
      console.error("Upload error:", error);

      setMessage(
        error.response?.data?.message ||
        "Failed to upload resumes."
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-container">

      <h2>Upload Resumes</h2>

      <p>
        Upload multiple PDF or DOCX resumes
      </p>

      <input
        type="file"
        multiple
        accept=".pdf,.docx"
        onChange={handleFileChange}
      />

      {files.length > 0 && (
        <div className="selected-files">

          <h3>
            Selected Resumes ({files.length})
          </h3>

          {files.map((file, index) => (
            <div key={index}>
              {file.name}
            </div>
          ))}

        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
      >
        {uploading ? "Uploading..." : "Upload Resumes"}
      </button>

      {message && (
        <p>{message}</p>
      )}

    </div>
  );
}

export default ResumeUpload;