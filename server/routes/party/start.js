const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const Party = require("../../models/party.model");

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

router.route("/").post(isLoggedIn, function (req, res) {
    Party.findById(req.user.party, async function (err, party) {
        if (err) console.log(err);

        if (party && party.players && party.players.length < 2) {
            return res.status(400).send("Not enough players to start!");
        }

        party.gameMode = req.body.gameMode;
        party.showPlayers = req.body.showPlayers;
        party.isStarted = true;

        await party.save();
        await party.execPopulate("players");

        /**
         * Assign a new target for each player.
         * Reset the isAlive and isPending variables so they don't transfer.
         */
        const players = shuffle(party.players.filter(player => player.isAlive));
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
});

module.exports = router;