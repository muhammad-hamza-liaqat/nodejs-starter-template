const express = require("express");
const userRoutes = express.Router();

const { catchAsyncErrors, validationCatches } = require("../../utils/tryCatch");
const { getUserInformation } = require("../../controllers/usersController");

userRoutes.get("/my-profile", catchAsyncErrors(getUserInformation));

module.exports = {
  userRoutes,
};
