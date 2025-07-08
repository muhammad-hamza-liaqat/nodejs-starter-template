
const sendSuccess = (res, statusCode, message, data = {}) => {
    return res.status(statusCode).json({
        success: true,
        status: statusCode,
        message,
        data,
    });
};

const sendError = (res, statusCode, message, details = {}) => {
    return res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        details,
    });
};

module.exports = {
    sendSuccess,
    sendError
};
