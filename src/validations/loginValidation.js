const yup = require("yup");
const statusCodes = require("http-status-codes");

const loginValidation = (req, res, next) => {
  const schema = yup
    .object({
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
    })
    .noUnknown(true, "[email and password] are allowed only");

  try {
    schema.validateSync(req.body, { abortEarly: true, strict: true });
    next();
  } catch (error) {
    res.status(statusCodes.BAD_REQUEST).json({ error: error.errors });
  }
};

module.exports = loginValidation;
