const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");

router.route("/").get(isLoggedIn, async function (req, res) {
    await req.user.execPopulate("target");
    res.status(200).send(req.user.target);
});

module.exports = router;