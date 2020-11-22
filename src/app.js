const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const db = require("./db");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new session.MemoryStore,
    cookie: {
        path: '/',
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

app.get("/", (req, res) => {
    response.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
    console.log("Server running on http://localhost:%s/", port);
});

module.exports = app;