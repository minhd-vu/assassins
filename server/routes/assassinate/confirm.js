const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const User = require("../../models/user.model");

router.route("/").get(isLoggedIn, async function (req, res) {
    if (req.user.isPending) {
        req.user.isAlive = false;
        req.user.isPending = false;
        req.user.target = null;
        req.user.stats.deaths += 1;
        await req.user.save();

        await User.findOne({ "target": req.user._id }, async function (err, user) {
            
        });
    }
    res.status(200).send();
});

module.exports = router;