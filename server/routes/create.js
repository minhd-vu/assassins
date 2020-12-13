
const router = require("express").Router();
const isLoggedIn = require("../helpers/isLoggedIn");
const { customAlphabet } = require("nanoid/non-secure");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);

router.route("/").get(isLoggedIn, function (req, res) {
    console.log(req.user);
    res.send(nanoid());
});

module.exports = router;