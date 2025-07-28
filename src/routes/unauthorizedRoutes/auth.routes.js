const express = require("express");
const authRoutes = express.Router();
const { catchAsyncErrors, validationCatches } = require("../../utils/tryCatch");
const {
  userSignUp,
  userLogin,
  refreshTokenGeneration,
} = require("../../controllers/userController");
const {
  signupValidation,
  loginValidation,
  refreshValidation,
} = require("../../validations/index");

authRoutes.post(
  "/sign-up",
  validationCatches(signupValidation),
  catchAsyncErrors(userSignUp)
);
authRoutes.post(
  "/login",
  validationCatches(loginValidation),
  catchAsyncErrors(userLogin)
);

authRoutes.post(
  "/refresh-token",
  validationCatches(refreshValidation),
  catchAsyncErrors(refreshTokenGeneration)
);

module.exports = {
  authRoutes,
};
