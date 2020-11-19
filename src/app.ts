
import * as express from 'express';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

const port = process.env.PORT || 3000;
const app = express();

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
    res.sendFile(__dirname + "/public/home.html");
});

app.listen(port, () => {
    console.log("Server running on http://localhost:%s/", port);
});

module.exports = app;