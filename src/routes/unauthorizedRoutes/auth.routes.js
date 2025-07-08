const express = require("express")
const authRoutes = express.Router()
const { signupValidation } = require("../../utils/validations.yup")
const { catchAsyncErrors, validationCatches } = require("../../utils/tryCatch")
const { userSignUp } = require("../../controllers/userController")

authRoutes.post('/sign-up', validationCatches(signupValidation), catchAsyncErrors(userSignUp))

module.exports = {
    authRoutes
}