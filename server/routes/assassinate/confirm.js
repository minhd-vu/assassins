const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const User = require("../../models/user.model");
const shuffle = require("../../helpers/shuffle");

router.route("/").get(isLoggedIn, async function (req, res) {
    if (req.user.isPending) {

        const target = req.user.target;

        // Reset the player that died
        req.user.isAlive = false;
        req.user.isPending = false;
        req.user.target = null;
        req.user.stats.deaths++;
        await req.user.save();

        await User.findOne({ "target": req.user._id }, async function (err, user) {
            if (err) console.log(err);

            await user.execPopulate("party");
            await user.party.execPopulate("players");

            user.stats.elims++;

            switch (user.party.gameMode) {
                case "Classic":
                    if (user._id.toString() === target.toString()) {
                        user.stats.wins++;
                        user.target = null;
                    } else {
                        user.target = target;
                    }
                    break;
                case "Shuffle":
                    const alivePlayers = user.party.players.filter(player => player.isAlive);
                    const players = shuffle(alivePlayers.filter(player => player !== user));
                    players.forEach((player, i) => {
                        if (i === players.length - 1) {
                            player.target = players[0]._id;
                        } else {
                            player.target = players[i + 1]._id;
                        }
                        player.save();
                    });
                    break;
            }

            await user.save();
        });
    }
    res.status(200).send();
});

module.exports = router;