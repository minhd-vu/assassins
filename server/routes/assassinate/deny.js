const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");

router.route("/").get(isLoggedIn, async function (req, res) {
    if (req.user.isPending) {
        req.user.isPending = false;
        req.user.save();
    }
    res.status(200).send();
});

module.exports = router;