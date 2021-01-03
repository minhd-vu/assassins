const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");

router.route("/").get(isLoggedIn, async function (req, res) {
    await req.user.execPopulate("target");
    if (req.user.target) {
        req.user.target.isPending = true;
        await req.user.target.save();
    }
    res.status(200).send();
});

module.exports = router;