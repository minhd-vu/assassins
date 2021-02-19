const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const Party = require("../../models/party.model");
const User = require("../../models/user.model");
const setTargets = require("../../helpers/setTargets");

router.route("/").get(isLoggedIn, async function (req, res) {
    await Party.updateOne({ _id: req.user.party }, { $pullAll: { players: [req.user._id] } });
    await Party.deleteOne({ players: { $exists: true, $size: 0 } });

    if (req.user.isAdmin) {
        await req.user.execPopulate("party");
        await req.user.party.execPopulate("players");
        const player = req.user.party.players[Math.floor(Math.random() * req.user.party.players.length)];
        player.isAdmin = true;
        await player.save();
    }

    await req.user.execPopulate("party");

    if (req.user.party) {
        const target = req.user.target;

        await User.findOne({ "target": req.user._id }, async function (err, user) {
            if (err) console.log(err);
            setTargets(user, target);
        });
    }

    req.user.party = null;
    req.user.target = null;
    req.user.isAlive = true;
    req.user.isAdmin = false;

    await req.user.save();
    await User.updateMany({ target: req.user }, { target: null });

    res.status(200).send();
});

module.exports = router;