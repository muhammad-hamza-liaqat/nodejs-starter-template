const statusCodes = require("http-status-codes");
const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const { sendSuccess, sendError } = require("../utils/responseHandler");
const { hashPassword, comparePassword } = require("../helpers/bcrypt");
const { sendEmail } = require("../utils/nodemailer/sendEmail");
const { redisClient } = require("../config/redis.connection");

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

  const refreshToken = jwt.sign(
    { _id: isUser._id, email: isUser.email },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRY_IN }
  );

  // Convert "20d" or similar into seconds for Redis TTL
  let ttlInSeconds;
  if (process.env.JWT_REFRESH_SECRET_EXPIRY_IN.includes("d")) {
    const days = parseInt(process.env.JWT_REFRESH_SECRET_EXPIRY_IN);
    ttlInSeconds = days * 24 * 60 * 60;
  } else if (process.env.JWT_REFRESH_SECRET_EXPIRY_IN.includes("h")) {
    const hours = parseInt(process.env.JWT_REFRESH_SECRET_EXPIRY_IN);
    ttlInSeconds = hours * 60 * 60;
  } else if (process.env.JWT_REFRESH_SECRET_EXPIRY_IN.includes("m")) {
    const minutes = parseInt(process.env.JWT_REFRESH_SECRET_EXPIRY_IN);
    ttlInSeconds = minutes * 60;
  } else {
    ttlInSeconds = Number(process.env.JWT_REFRESH_SECRET_EXPIRY_IN);
  }

  // Store refresh token in Redis
  await redisClient.set(`refreshToken:${isUser._id}`, refreshToken, {
    EX: ttlInSeconds,
  });

  const user = { _id: isUser?._id, email: isUser?.email };
  sendEmail("loginSuccess", {
    to: isUser?.email,
    name: isUser?.name,
  });
  // console.log(process.env.JWT_SECRET, process.env.JWT_SECRET_EXPIRY_IN, "---Hamza")
  return sendSuccess(res, statusCodes.OK, "USER_LOGIN_SUCCESS", {
    user,
    token,
    refreshToken,
  });
};

const refreshTokenGeneration = async (req, res) => {
  const { refreshToken } = req.body;

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

  const newAccessToken = jwt.sign(
    {
      _id: decoded._id,
      email: decoded.email,
      name: decoded.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_SECRET_EXPIRY_IN }
  );

  const newRefreshToken = jwt.sign(
    {
      _id: decoded._id,
      email: decoded.email,
      name: decoded.name,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: process.env.JWT_REFRESH_SECRET_EXPIRY_IN }
  );

  return sendSuccess(res, statusCodes.OK, "ACCESS_TOKEN_REFRESHED", {
    token: newAccessToken,
    refreshToken: newRefreshToken,
  });
};

module.exports = {
  userSignUp,
  userLogin,
  refreshTokenGeneration,
};
