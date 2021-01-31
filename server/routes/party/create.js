const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const { customAlphabet } = require("nanoid/non-secure");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);
const Party = require("../../models/party.model");
const mongoose = require("mongoose");

router.route("/").get(isLoggedIn, async function createParty (req, res) {
    console.log(req.user);

    const code = nanoid();

    const party = new Party({
        code: code
    });

    party.players.push(req.user);

    try {
        await party.save();
    } catch (err) {
        if (err.code === "11000") {
            return createParty(req, res);
        } else {
            throw err;
        }
    }

    req.user.isAdmin = true;
    req.user.party = party;

    await req.user.save();

    console.log(party);
    res.status(200).send(party.code);
});

module.exports = router;