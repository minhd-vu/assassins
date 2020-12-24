const router = require("express").Router();

router.route("/").get(function (req, res) {
    console.log(req.user);
    req.logout();
    res.status(200).send();
});

module.exports = router;

