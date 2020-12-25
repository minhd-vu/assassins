const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const Party = require("../../models/party.model");
const User = require("../../models/user.model");

router.route("/").get(isLoggedIn, async function (req, res) {
    await Party.updateOne({ _id: req.user.party }, { $pullAll: { players: [req.user._id] } });
    await Party.remove({ players: { $exists: true, $size: 0 } });
    req.user.party = null;
    await req.user.save();
    res.status(200).send();
});

module.exports = router;