const yup = require('yup');
const statusCodes = require("http-status-codes")

const signupValidation = async (req, res, next) => {
    const schema = yup.object({
        name: yup
            .string()
            .required("Name is required"),
        email: yup
            .string()
            .email("Please enter a valid email")
            .required("Email is required"),
        password: yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters")
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])\S+$/,
                "Password must contain at least one letter, one number, one special character, and no spaces"
            ),
    }).noUnknown(true, "[Only name, email and password are allowed]");

    await schema.validate(req.body, { abortEarly: true, strict: true });
    next();
};


const loginValidation = async (req, res, next) => {
    const schema = yup.object({
        email: yup
            .string()
            .email("Please enter a valid email")
            .required("Email is required"),
        password: yup
            .string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
    }).noUnknown(true, "Only 'email' and 'password' are allowed in the request body");

    try {
        schema.validateSync(req.body, { abortEarly: true, strict: true });
        next();
    } catch (error) {
        res.status(statusCodes.BAD_REQUEST).json({ error: error.errors });
    }
};

module.exports = {
    signupValidation,
    loginValidation
}