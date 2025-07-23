const sendSuccess = (res, statusCode, messageKey, data = {}) => {
  return res.status(statusCode).json({
    success: true,
    status: statusCode,
    message: res.__(messageKey),
    data,
  });
};

const sendError = (res, statusCode, messageKey, details = {}) => {
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: res.__(messageKey),
    details,
  });
};

module.exports = {
  sendSuccess,
  sendError,
};
