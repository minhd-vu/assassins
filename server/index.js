const express = require("express");
const cookieSession = require("cookie-session");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");
const User = require("./models/user.model");
const LocalStrategy = require("passport-local");
const cookieParser = require("cookie-parser");
const path = require("path");
const socketio = require("socket.io");
const http = require("http");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "../build")));
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

app.use(cookieSession({
    name: "session",
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 100
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api/login", require("./routes/login"));
app.use("/api/register", require("./routes/register"));
app.use("/api/logout", require("./routes/logout"));
app.use("/api/create", require("./routes/create"));
app.use("/api/join", require("./routes/join"));
app.use("/api/party", require("./routes/party"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

// io.on("connection", socket => {
//     console.log(socket);
//     socket.emit("message", "Welcome to Assassins Party Game!");
// });

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});

module.exports = app;