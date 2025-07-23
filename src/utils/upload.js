const path = require("path");
const fs = require("fs");
const multer = require("multer");

// ✅ Use __dirname to place uploads inside /src
const uploadsBase = path.join(__dirname, "../media");
const imagesPath = path.join(uploadsBase, "images");
const videosPath = path.join(uploadsBase, "videos");

const ensureDirectories = () => {
  [uploadsBase, imagesPath, videosPath].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`[DIR] Created folder: ${dir}`);
    }
  });
};

ensureDirectories();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;

    if (file.mimetype.startsWith("image/")) {
      uploadPath = imagesPath;
    } else if (file.mimetype.startsWith("video/")) {
      uploadPath = videosPath;
    } else {
      return cb(new Error("Invalid file type"), false);
    }

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/", "video/"];
  const isValid = allowedTypes.some((type) => file.mimetype.startsWith(type));
  isValid
    ? cb(null, true)
    : cb(new Error("Only image and video files allowed"), false);
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
