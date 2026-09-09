const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

console.log("1. Starting server...");

dotenv.config();

console.log("2. dotenv loaded");

const app = express();

console.log("3. Express app created");

app.use(cors());
app.use(express.json());

console.log("4. Middleware loaded");

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

console.log("5. Uploads folder configured");

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Smart Resume Screening API is running"
    });
});

console.log("6. Test route created");

console.log("7. Loading resume routes...");

const resumeRoutes = require("./routes/resumeRoutes");

console.log("8. Resume routes loaded");
console.log("Resume routes type:", typeof resumeRoutes);

app.use("/api/resumes", resumeRoutes);

console.log("9. Resume routes registered");

const PORT = process.env.PORT || 5000;

console.log("10. Starting server on port:", PORT);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});