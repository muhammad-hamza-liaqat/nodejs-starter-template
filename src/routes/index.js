const express = require("express");
const myAppRoutes = express.Router();
const { unauthorizedRoutes } = require("./unauthorizedRoutes/index");
const { authorizedRoutes } = require("./authorizedRoutes/index");
const { authenticateToken } = require("../middlewares/auth");

myAppRoutes.use("", unauthorizedRoutes);
// applied middleware for auth for authorized routes
// it will require the jwtToken for all the routes written below
myAppRoutes.use(authenticateToken);
myAppRoutes.use("", authorizedRoutes);

module.exports = {
  myAppRoutes,
};
