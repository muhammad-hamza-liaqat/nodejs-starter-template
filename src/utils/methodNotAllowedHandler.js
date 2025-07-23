// utils/methodNotAllowedHandler.js

const methodNotAllowedHandler = (req, res, next) => {
  res.status(405).json({
    error: "Method Not Allowed",
    message: `The method ${req.method} is not allowed for ${req.originalUrl}.`,
  });
};

module.exports = methodNotAllowedHandler;