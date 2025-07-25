const statusCodes = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const { sendSuccess, sendError } = require("../utils/responseHandler");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");

const userSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return sendError(res, statusCodes.CONFLICT, "USER_ALREADY_EXISTS");
  }

  const hashed = await hashPassword(password);

  const user = new User({ name, email, password: hashed });
  await user.save();
  const responseUser = {
    _id: user._id,
    name: user.name,
    email: user.email,
  };

  return sendSuccess(res, statusCodes.CREATED, "USER_REGISTER_SUCCESS", {
    user: responseUser,
  });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  const isUser = await User.findOne({ email });
  if (!isUser) {
    return sendError(res, statusCodes.CONFLICT, "INVALID_EMAIL_OR_PASSWORD");
  }
  const verifyPassword = await comparePassword(password, isUser?.password);
  if (!verifyPassword) {
    return sendError(res, statusCodes.CONFLICT, "INVALID_EMAIL_OR_PASSWORD");
  }
  const token = jwt.sign(
    { _id: isUser?._id, email: isUser?.email, name: isUser?.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_SECRET_EXPIRY_IN }
  );
  const user = { _id: isUser?._id, email: isUser?.email };
  // console.log(process.env.JWT_SECRET, process.env.JWT_SECRET_EXPIRY_IN, "---Hamza")
  return sendSuccess(res, statusCodes.OK, "USER_LOGIN_SUCCESS", {
    user,
    token,
  });
};

module.exports = {
  userSignUp,
  userLogin,
};
