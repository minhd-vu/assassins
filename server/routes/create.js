const router = require("express").Router();
const isLoggedIn = require("../helpers/isLoggedIn");
const { customAlphabet } = require("nanoid/non-secure");
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 5);
const Party = require("../models/party.model");
const User = require("../models/user.model");

router.route("/").get(isLoggedIn, function (req, res) {
    console.log(req.user);
    
    const code = nanoid();
    const admin = req.user.username;

    const party = new Party({
        code,
        admin
    });

    party.players.push({
        player: admin,
        target: null
    });

    console.log(party);

    party.save().then(() => {
        res.status(200).send(code);
    });
});

module.exports = router;