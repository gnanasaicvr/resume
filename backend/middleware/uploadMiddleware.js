const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDirectory = path.join(
    __dirname,
    "../uploads"
);

// Create uploads folder if it doesn't exist
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, {
        recursive: true
    });
}

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, uploadDirectory);
    },

    filename: (req, file, cb) => {

        const extension =
            path.extname(file.originalname);

        const fileName =
            `${Date.now()}-${Math.round(Math.random() * 1E9)}${extension}`;

        cb(null, fileName);
    }

});

const fileFilter = (req, file, cb) => {

    const extension =
        path.extname(file.originalname)
        .toLowerCase();

    if (
        extension === ".pdf" ||
        extension === ".docx"
    ) {
        cb(null, true);
    } else {
        cb(
            new Error(
                "Only PDF and DOCX files are allowed"
            )
        );
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = upload;
