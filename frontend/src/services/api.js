import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const uploadResumes = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("resumes", file);
  });

  const response = await API.post(
    "/resumes/upload",
    formData
  );

  return response.data;
};

export const analyzeCandidates = async (
  jobDescription,
  resumes
) => {
  const response = await API.post(
    "/resumes/analyze",
    {
      jobDescription,
      resumes,
    }
  );

  return response.data;
};