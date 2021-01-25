const router = require("express").Router();
const User = require("../models/user.model");

router.route("/").get(function (req, res) {
    User.find({}).sort({ "stats.elims": "descending", "stats.deaths": "ascending" }).exec(function (err, users) {
        const players = [];

        if (err) console.log(err);

        users.forEach(function (user, index) {
            players.push({
                username: user.username,
                elims: user.stats.elims,
                deaths: user.stats.deaths,
                rank: index + 1
            });
        });

        res.status(200).send(players);
    });
});

module.exports = router;