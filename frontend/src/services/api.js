import axios from "axios";

const API = axios.create({
  baseURL: "https://resume-aprk.onrender.com/api/resumes",
});

export const uploadResumes = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("resumes", file);
  });

  const response = await API.post(
    "/upload",
    formData
  );

  return response.data;
};

export const analyzeCandidates = async (
  jobDescription,
  resumes
) => {
  const response = await API.post(
    "/analyze",
    {
      jobDescription,
      resumes,
    }
  );

  return response.data;
};