const jwt = require("jsonwebtoken");
const statusCodes = require("http-status-codes");
const { sendError } = require("../utils/responseHandler");

const authenticateToken = (req, res, next) => {
  console.log("🔐 [AUTH CHECK]:", req.originalUrl);

  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendError(
      res,
      statusCodes.UNAUTHORIZED,
      "JWT Token missing or invalid format"
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ JWT Error:", err.message);
    return sendError(res, statusCodes.FORBIDDEN, "Invalid or expired token");
  }
};

module.exports = { authenticateToken };
