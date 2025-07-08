const statusCodes = require("http-status-codes")
const User = require("../models/user.model")

const { sendSuccess, sendError } = require("../utils/responseHandler")
const { hashPassword, comparePassword } = require("../helpers/bcrypt");

const userSignUp = async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
        return sendError(res, statusCodes.CONFLICT, "User already exists");
    }

    const hashed = await hashPassword(password);

    const user = new User({ name, email, password: hashed });
    await user.save();
    const responseUser = {
        _id: user._id,
        name: user.name,
        email: user.email
    };

    return sendSuccess(res, statusCodes.CREATED, "User registered successfully", { user: responseUser });
}


module.exports = {
    userSignUp
}