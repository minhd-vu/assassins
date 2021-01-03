const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");

router.route("/").get(isLoggedIn, async function (req, res) {
    if (req.user.isPending) {
        req.user.isAlive = false;
        req.user.isPending = false;
        await req.user.save();
    }
    res.status(200).send();
});

module.exports = router;