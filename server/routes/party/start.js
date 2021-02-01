const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const Party = require("../../models/party.model");
const shuffle = require("../../helpers/shuffle");

router.route("/").post(isLoggedIn, async function (req, res) {
    await req.user.execPopulate("party");
    const party = req.user.party;

    if (party && party.players && party.players.length < 2) {
        return res.status(400).send("Not enough players to start!");
    }

    party.gameMode = req.body.gameMode;
    party.showPlayers = req.body.showPlayers;
    party.isStarted = true;
    party.winner = null;

    await party.save();
    await party.execPopulate("players");

    /**
     * Assign a new target for each player.
     * Reset the isAlive and isPending variables so they don't transfer.
     */
    const players = shuffle(party.players);
    await players.forEach((player, i) => {
        if (i === players.length - 1) {
            player.target = players[0]._id;
        } else {
            player.target = players[i + 1]._id;
        }
        player.isAlive = true;
        player.isPending = false;
        player.save();
    });

    res.status(200).send();
});

module.exports = router;