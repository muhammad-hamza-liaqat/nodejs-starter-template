const express = require("express");
const authorizedRoutes = express.Router();
const { userRoutes } = require("./user.routes");

authorizedRoutes.use("/users", userRoutes);

module.exports = {
  authorizedRoutes,
};
