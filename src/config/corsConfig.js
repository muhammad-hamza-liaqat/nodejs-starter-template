const cors = require('cors');

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', "http://localhost:5173"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

module.exports = cors(corsOptions);
