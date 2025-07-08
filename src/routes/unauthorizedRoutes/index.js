const express = require("express")
const unauthorizedRoutes = express.Router()
const { authRoutes } = require("./auth.routes")

unauthorizedRoutes.use('/auth', authRoutes)

module.exports = {
    unauthorizedRoutes
}
