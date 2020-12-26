const router = require("express").Router();
const isLoggedIn = require("../../helpers/isLoggedIn");
const Party = require("../../models/party.model");

router.route("/").get(isLoggedIn, async function (req, res) {
    await Party.updateOne({ _id: req.user.party }, { $pullAll: { players: [req.user._id] } });
    await Party.deleteOne({ players: { $exists: true, $size: 0 } });
    req.user.party = null;
    req.user.target = null;
    req.user.isAlive = true;
    req.user.isAdmin = false;
    await req.user.save();
    res.status(200).send();
});

module.exports = router;