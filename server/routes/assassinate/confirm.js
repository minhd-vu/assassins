const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const User = require("../../models/user.model");
const setTargets = require("../../helpers/setTargets");

router.route("/").get(isLoggedIn, async function (req, res) {
    if (req.user.isPending) {

        const target = req.user.target;

        // Reset the player that died
        req.user.isAlive = false;
        req.user.isPending = false;
        req.user.target = null;
        req.user.stats.deaths++;
        await req.user.save();

        await User.findOne({ "target": req.user._id }, async function (err, user) {
            if (err) console.log(err);
            user.stats.elims++;
            setTargets(user, target);
        });
    }
    res.status(200).send();
});

module.exports = router;