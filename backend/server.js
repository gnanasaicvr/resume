const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uploaded files
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Smart Resume Screening API is running"
  });
});

// Resume routes
const resumeRoutes = require("./routes/resumeRoutes");

app.use("/api/resumes", resumeRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

// Render port
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});