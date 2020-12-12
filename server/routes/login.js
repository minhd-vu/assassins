const router = require("express").Router();
const passport = require("passport");
const isLoggedIn = require("../helpers/isLoggedIn");

router.route("/").get(isLoggedIn, function (req, res) {
    res.send(req.user);
});

router.route("/").post(passport.authenticate("local"), function (req, res) {
    if (isLoggedIn) {
        console.log(req.user);
        res.status(200).send({ username: req.user.username });
    } else {
        res.status(204).send();
    }
});

module.exports = router;