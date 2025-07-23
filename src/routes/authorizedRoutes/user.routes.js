const express = require("express");
const userRoutes = express.Router();

const { catchAsyncErrors, validationCatches } = require("../../utils/tryCatch");
const {
  getUserInformation,
  uploadMedia,
} = require("../../controllers/usersController");

const upload = require("../../utils/upload");

userRoutes.get("/my-profile", catchAsyncErrors(getUserInformation));

userRoutes.post(
  "/upload-media",
  upload.single("file"),
  catchAsyncErrors(uploadMedia)
);

module.exports = {
  userRoutes,
};
