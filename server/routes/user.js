const router = require("express").Router();
const User = require("../models/user.model");

router.route("/:id").get(function (req, res) {
    console.log(req.params.id);
    User.findOne({ "username": req.params.id }, function (err, user) {
        if (err) console.log(err);

        if (!user) {
            return res.status(204).send();
        }

        res.status(200).send({
            elims: user.stats.elims,
            deaths: user.stats.deaths,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        });
    });
});

module.exports = router;