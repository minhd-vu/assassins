const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const User = require("../../models/user.model");

router.route("/").get(isLoggedIn, async function (req, res) {
    if (req.user.isPending) {

        const target = req.user.target;

        // Reset the player that died
        req.user.isAlive = false;
        req.user.isPending = false;
        req.user.target = null;
        req.user.stats.deaths += 1;
        await req.user.save();

        console.log(target);

        await User.findOne({ "target": req.user._id }, async function (err, user) {
            if (err) console.log(err);

            await user.execPopulate("party");
            await user.party.execPopulate("players");

            const alivePlayers = user.party.players.filter(player => player.isAlive);

            switch (req.user.party.gameMode) {
                case "Classic":
                    user.target = target;
                    await user.save();
                    break;
                case "Shuffle":
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
        });
    }
    res.status(200).send();
});

module.exports = router;