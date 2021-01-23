const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const User = require("../../models/user.model");

router.route("/").get(isLoggedIn, async function (req, res) {
    if (req.user.isPending) {
        req.user.isAlive = false;
        req.user.isPending = false;
        req.user.target = null;
        req.user.stats.deaths += 1;
        await req.user.save();

        await req.user.execPopulate("party");

        await User.findOne({ "target": req.user._id }, function (err, user) {
            if (err) console.log(err);
            console.log(user);


            switch (req.user.party.gameMode) {
                case "Classic":
                    break;
                case "Shuffle":
                    await req.user.party.execPopulate("players");
                    const players = shuffle(req.user.party.players.filter(player => player.isAlive && player !== user));
                    await players.forEach((player, i) => {
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