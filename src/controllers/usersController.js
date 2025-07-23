const statusCode = require("http-status-codes");

const User = require("../models/user.model");
const { sendSuccess, sendError } = require("../utils/responseHandler");

const getUserInformation = async (req, res) => {
  const userId = req?.user?._id;
  // const userId = "6880b45344b5d1bc80bb914c"
  const user = await User.findById(userId);
  if (!user) {
    return sendError(res, statusCode.CONFLICT, "No such User Exist!");
  }
  const userInformation = {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    password: user?.password,
  };
  return sendSuccess(
    res,
    statusCode.OK,
    "user information fetched successfully!",
    { user: userInformation }
  );
};

module.exports = {
  getUserInformation,
};
