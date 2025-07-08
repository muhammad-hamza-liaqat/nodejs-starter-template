const express = require("express")
const myAppRoutes = express.Router()
const { unauthorizedRoutes } = require("./unauthorizedRoutes/index")

myAppRoutes.use('', unauthorizedRoutes)


module.exports = {
    myAppRoutes
}