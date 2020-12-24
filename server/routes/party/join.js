const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const Party = require("../../models/party.model");
const User = require("../../models/user.model");

router.route("/:id").get(isLoggedIn, function (req, res) {
    Party.findOne({ "code": req.params.id }, async function (err, party) {
        if (err) console.log(err);

        if (party.isStarted) {
            res.status(204).send();
        }

        if (!party.players.some(e => String(e) === String(req.user._id))) {
            req.user.party = party;
            await req.user.save();
            party.players.push(req.user);
            await party.save();
        }

        await party.execPopulate("players");
        res.status(200).send(party);
    });
});

module.exports = router;