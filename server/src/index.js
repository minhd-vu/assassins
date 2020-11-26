const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const User = require("./models/user");
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => console.log("Connected to MongoDB database")).catch(err => {
    console.log(err.message);
});

app.use(express.urlencoded({ extended: true }));
app.use(require("express-session")({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// app.use('/login', require('./routes/login'));
// app.use('/register', require('./routes/register'));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
    res.render("home");
});

app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});

app.get("/register", function (req, res) {
    res.render("register");
});

app.post("/register", function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/secret");
        });
    });
});

app.get("/login", function (req, res) {
    res.render("login");
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res) {
    res.send("User is " + req.user.id);
});

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});

module.exports = app;