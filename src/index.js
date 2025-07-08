require("dotenv").config();
require("./config/mongoose.connection")

const PORT = process.env.PORT || 8080;

const express = require("express");
const path = require("path")

const cors = require('./config/corsConfig')
const requestLogger = require("./utils/requestLogger")
const notFoundHandler = require("./utils/notFoundHandler")
const { myAppRoutes } = require("./routes/index")


const app = express();

app.use(requestLogger);
app.use(cors)
app.use(express.json())
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('startServer.ejs', { port: PORT });
});

// add your application routes here.
app.use('/api', myAppRoutes)

app.use(notFoundHandler);

app.listen(PORT, () => {
    console.warn(`🚀 Node.js server is running at http://localhost:${PORT}/`)
})