const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");

router.route("/").get(isLoggedIn, async function (req, res) {
    if (req.user.isAdmin) {
        await req.user.execPopulate("party");
        req.user.party.isStarted = false;
        await req.user.party.save();
        res.status(200).send();
    }
});

module.exports = router;