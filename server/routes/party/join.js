const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const Party = require("../../models/party.model");
const User = require("../../models/user.model");

router.route("/:id").get(isLoggedIn, function (req, res) {
    Party.findOne({ "code": req.params.id }, async function (err, party) {
        if (err) console.log(err);

        if (!party) {
            return res.status(400).send("Could not find party with code " + req.params.id + ".");
        } else if (party.isStarted) {
            return res.status(400).send("Party " + req.params.id + " has already started!");
        }

        if (!party.players.some(e => String(e) === String(req.user._id))) {
            req.user.party = party;
            await req.user.save();
            party.players.push(req.user);
            await party.save();
        }

        await party.execPopulate("players");
        return res.status(200).send(party);
    });
});

module.exports = router;