const router = require('express').Router();
const passport = require("passport");

router.route('/').post(function (req, res) {
    User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
        if (err) {
            console.log(err);
        }
        passport.authenticate("local")(req, res, function () {
            res.status(200).send();
        });
    });
});

module.exports = router;