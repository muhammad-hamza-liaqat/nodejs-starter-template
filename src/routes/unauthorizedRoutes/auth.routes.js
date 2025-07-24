const express = require("express");
const authRoutes = express.Router();
const { catchAsyncErrors, validationCatches } = require("../../utils/tryCatch");
const { userSignUp, userLogin } = require("../../controllers/userController");
const {
  signupValidation,
  loginValidation,
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

module.exports = {
  authRoutes,
};
