const router = require("express").Router();
const isLoggedIn = require("../helpers/isLoggedIn");
const Party = require("../models/party.model");
const User = require("../models/user.model");

router.route("/:id").get(isLoggedIn, function (req, res) {
    console.log(req.user);

    Party.findOne({ "code": req.params.id }, function (err, party) {
        if (err) {
            console.log(err);
        }

        if (!party.players.some(e => e.player === req.user.username)) {
            party.players.push({
                player: req.user.username,
                target: null
            });
            party.save();

            console.log(party);
        }

        res.status(200).send(party);
    });
});

module.exports = router;