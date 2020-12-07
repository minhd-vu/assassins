const express = require('express');
const session = require('express-session');
const cookieSession = require("cookie-session");
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

<<<<<<< HEAD
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
=======
// app.use(cors());
>>>>>>> 47ace4f5589999379eedec870206c4f58ad3f060
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.ATLAS_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(() => console.log("Connected to MongoDB database")).catch(err => {
    console.log(err.message);
});

app.use(express.urlencoded({ extended: true }));
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
//     store: new session.MemoryStore,
//     cookie: {
//         path: '/',
//         secure: false,
//         httpOnly: false,
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }));

app.use(cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 100
}));

app.use(cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
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
        console.log(req.user);
        res.send({ username: req.user.username });
    } else {
        res.status(204).send();
    }
});

app.get("/logout", function (req, res) {
    req.logout();
});

app.get("/create", isLoggedIn, function (req, res) {
    res.redirect("/" + nanoid());
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