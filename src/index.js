require("dotenv").config();
require("./config/mongoose.connection")
const PORT = process.env.PORT || 8080;

const express = require("express");
const path = require("path")

const cors = require('./config/corsConfig')


const app = express();

app.use(cors)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('startServer.ejs', { port: PORT });
});

app.listen(PORT, () => {
    console.warn(`🚀 Node.js server is running at http://localhost:${PORT}/`)
})