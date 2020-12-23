const router = require("express").Router();
const isLoggedIn = require("../helpers/isLoggedIn");
const Party = require("../models/party.model");
const Player = require("../models/player.model");
const User = require("../models/user.model");

router.route("/:id").get(isLoggedIn, function (req, res) {
    console.log(req.user);

    Party.findOne({ "code": req.params.id }, function (err, party) {
        if (err) {
            console.log(err);
        }

        party.execPopulate({
            path: "players",
            populate: {
                path: "player",
                model: "Player"
            }
        }).then(() => {
            console.log(party);
            if (!party.players.some(e => e.player === req.user._id)) {
                party.players.push(new Player({
                    player: req.user._id,
                    target: null,
                    isAdmin: false,
                    party: party._id
                }));
    
                party.save().then((p) => {
                    res.status(200).send(p);
                });
            }
        });
    });
});

module.exports = router;