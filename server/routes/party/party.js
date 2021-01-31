const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");

router.route("/").get(isLoggedIn, async function (req, res) {
    let winner = null;
    await req.user.execPopulate("party");
    if (req.user.party) {
        await req.user.party.execPopulate("players");

        // Assign a winner if there is only one player left.
        const players = req.user.party.players.filter(player => player.isAlive);
        if (players.length === 1) {
            winner = players[0];
        }
    }

    res.status(200).send({
        // toObject() must be used here or else the data will be put into _doc on api request.
        ...req.user.party.toObject(),
        winner: winner
    });
});

module.exports = router;