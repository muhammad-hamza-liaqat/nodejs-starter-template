const yup = require("yup");

const signupValidation = (req, res, next) => {
  const schema = yup
    .object({
      name: yup.string().required("Name is required"),
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Email is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/,
          "Password must contain at least one letter, one number, one special character, and no spaces"
        ),
    })
    .noUnknown(true, "[name, email and password ] are allowed only");

  schema.validateSync(req.body, { abortEarly: true, strict: true });
  next();
};

module.exports = signupValidation;
