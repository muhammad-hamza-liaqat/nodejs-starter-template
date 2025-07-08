const requestLogger = (req, res, next) => {
    const start = Date.now();
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(
            `Incoming request: ${req.method} ${req.originalUrl} from IP: ${ip} - Status: ${res.statusCode} - Duration: ${duration}ms`
        );
    });

    next();
};

module.exports = requestLogger;