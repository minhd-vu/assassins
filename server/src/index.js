const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const User = require("./models/user.model");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const { customAlphabet } = require('nanoid/non-secure');
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 5);
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.ATLAS_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => console.log("Connected to MongoDB database")).catch(err => {
    console.log(err.message);
});

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
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

// app.use('/login', require('./routes/login'));
// app.use('/register', require('./routes/register'));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.post("/register", function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            // return res.render('register');
        }
        passport.authenticate("local")(req, res, function () {
            // res.redirect("/secret");
        });
    });
});

app.post("/login", passport.authenticate("local"), function (req, res) {
    if (isLoggedIn) {
        res.json("/");
    }
});

app.get("/logout", function (req, res) {
    req.logout();
    // res.redirect("/");
});

app.get("/create", isLoggedIn, function (req, res) {
    res.redirect("/" + nanoid());
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.json("/login");
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});

module.exports = app;