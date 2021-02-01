const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");

router.route("/").get(isLoggedIn, async function (req, res) {
    let winner = null;
    await req.user.execPopulate("party");
    if (req.user.party) {
        await req.user.party.execPopulate("players");
        await req.user.party.execPopulate("winner");
    }

    res.status(200).send(req.user.party);
});

module.exports = router;