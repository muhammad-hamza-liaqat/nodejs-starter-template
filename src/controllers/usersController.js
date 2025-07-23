const statusCode = require("http-status-codes");

const User = require("../models/user.model");
const { sendSuccess, sendError } = require("../utils/responseHandler");

const getUserInformation = async (req, res) => {
  const userId = req?.user?._id;
  // const userId = "6880b45344b5d1bc80bb914c"
  const user = await User.findById(userId);
  if (!user) {
    return sendError(res, statusCode.CONFLICT, "USER_ALREADY_EXISTS");
  }
  const userInformation = {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    password: user?.password,
  };
  return sendSuccess(res, statusCode.OK, "USER_INFORMATION_FETCHED", {
    user: userInformation,
  });
};

const uploadMedia = (req, res) => {
  if (!req.file) {
    return sendError(res, statusCode.BAD_REQUEST, "NO_FILE_UPLOADED");
  }

  const folder = req.file.mimetype.startsWith("image/") ? "images" : "videos";

  return sendSuccess(res, statusCode.OK, "FILE_UPLOADED_SUCCESSFULLY", {
    fileUrl: `/media/${folder}/${req.file.filename}`,
  });
};

module.exports = {
  getUserInformation,
  uploadMedia,
};
