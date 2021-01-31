const router = require("express").Router();
const User = require("../models/user.model");

router.route("/:id").get(async function (req, res) {
    let rank = 0;

    await User.find({}).sort({ "stats.elims": "descending", "stats.deaths": "ascending" }).exec(function (err, users) {
        if (err) console.log(err);
        rank = users.findIndex(user => user._id.equals(req.user._id)) + 1;
    });

    User.findOne({ "username": req.params.id }, function (err, user) {
        if (err) console.log(err);

        if (!user) {
            return res.status(204).send();
        }

        res.status(200).send({
            elims: user.stats.elims,
            deaths: user.stats.deaths,
            wins: user.stats.wins,
            rank: rank
        });
    });
});

module.exports = router;