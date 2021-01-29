const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const { customAlphabet } = require("nanoid/non-secure");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);
const Party = require("../../models/party.model");
const mongoose = require("mongoose");

router.route("/").get(isLoggedIn, async function (req, res) {
    console.log(req.user);

    let code;
    
    do {
        code = nanoid();
    } while (Party.findOne({ code: code }).exec());

    const party = new Party({
        code: code
    });

    party.players.push(req.user);

    await party.save();

    req.user.isAdmin = true;
    req.user.party = party;

    await req.user.save();

    console.log(party);
    res.status(200).send(party.code);
});

module.exports = router;