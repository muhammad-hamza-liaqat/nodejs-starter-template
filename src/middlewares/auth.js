const jwt = require('jsonwebtoken');
const statusCodes = require('http-status-codes');
const { sendError } = require('../utils/responseHandler');

const authenticateToken = (req, res, next) => {
    console.log("🔐 [AUTH CHECK]:", req.originalUrl);

    if (!req.route) {
        return next();
    }

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return sendError(res, statusCodes.UNAUTHORIZED, 'JWT Token missing');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return sendError(res, statusCodes.FORBIDDEN, 'Invalid or expired token');
        }

        req.user = user;
        next();
    });
};

module.exports = { authenticateToken };