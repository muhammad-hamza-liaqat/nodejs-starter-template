const express = require("express")
const authRoutes = express.Router()
const { signupValidation, loginValidation } = require("../../utils/validations.yup")
const { catchAsyncErrors, validationCatches } = require("../../utils/tryCatch")
const { userSignUp, userLogin } = require("../../controllers/userController")

authRoutes.post('/sign-up', validationCatches(signupValidation), catchAsyncErrors(userSignUp))
authRoutes.post('/login', validationCatches(loginValidation), catchAsyncErrors(userLogin))

module.exports = {
    authRoutes
}