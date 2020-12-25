const router = require("express").Router();
const passport = require("passport");
const isLoggedIn = require("../../helpers/isLoggedIn");

router.route("/").get(isLoggedIn, async function (req, res) {
    await req.user.execPopulate("party");

    res.status(200).send({
        username: req.user.username,
        partyCode: req.user.party.code,
        isAdmin: req.user.isAdmin
    });
});

router.route("/").post(passport.authenticate("local"), async function (req, res) {
    if (isLoggedIn) {
        console.log(req.user);

        await req.user.execPopulate("party");

        res.status(200).send({
            username: req.user.username,
            partyCode: req.user.party.code,
            isAdmin: req.user.isAdmin
        });
    } else {
        res.status(204).send();
    }
});

module.exports = router;