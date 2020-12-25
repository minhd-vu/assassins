const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const Party = require("../../models/party.model");
const User = require("../../models/user.model");

router.route("/").get(isLoggedIn, async function (req, res) {
    Party.updateOne({ _id: req.user.party }, { $pullAll: { players: [req.user._id] } });
    req.user.party = null;
    await req.user.save();
    res.status(200).send();
});

module.exports = router;