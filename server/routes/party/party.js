const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");

router.route("/").get(isLoggedIn, async function (req, res) {
    await req.user.execPopulate("party");
    if (req.user.party) {
        await req.user.party.execPopulate("players");
        if (req.user.party.isStarted) {
            await req.user.execPopulate("target");
            if (req.user.target) {
                return res.status(200).send({
                    isStarted: true,
                    target: req.user.target.username,
                    players: req.user.party.players
                });
            }
        }
    }
    res.status(200).send(req.user.party);
});

module.exports = router;