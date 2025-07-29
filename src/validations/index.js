const signupValidation = require("./signUpValidation");
const loginValidation = require("./loginValidation");
const refreshValidation = require("./refreshValidation");

module.exports = {
  signupValidation,
  loginValidation,
  refreshValidation,
};

// abort: false will show all the errors at once
// abort: true will show error one by one
