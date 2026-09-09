const fs = require("fs");
const path = require("path");

const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");

async function extractText(filePath) {

    const extension =
        path.extname(filePath).toLowerCase();

    const fileBuffer =
        fs.readFileSync(filePath);

    // =========================
    // PDF
    // =========================

    if (extension === ".pdf") {

        const parser = new PDFParse({
            data: fileBuffer
        });

        try {

            const result =
                await parser.getText();

            return result.text;

        } finally {

            await parser.destroy();

        }
    }

    // =========================
    // DOCX
    // =========================

    if (extension === ".docx") {

        const result =
            await mammoth.extractRawText({
                buffer: fileBuffer
            });

        return result.value;
    }

    throw new Error(
        "Unsupported file format"
    );
}

module.exports = {
    extractText
};