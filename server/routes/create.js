
const router = require("express").Router();
const isLoggedIn = require("../helpers/isLoggedIn");
const nanoid = require("../helpers/nanoid");

router.route("/").get(isLoggedIn, function (req, res) {
    console.log(req.user);
    res.send(nanoid());
});

module.exports = router;