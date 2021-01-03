const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");

router.route("/").get(isLoggedIn, async function (req, res) {
    res.status(200).send(req.user.isPending);
});

module.exports = router;