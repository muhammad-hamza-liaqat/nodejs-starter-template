const signupValidation = require("./signUpValidation");
const loginValidation = require("./loginValidation");

module.exports = {
  signupValidation,
  loginValidation,
};

// abort: false will show all the errors at once
// abort: true will show error one by one
