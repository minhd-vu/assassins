const router = require("express").Router();
const isLoggedIn = require("../helpers/isLoggedIn");
let Party = require("../models/party.model");

router.route("/:id").get(isLoggedIn, function (req, res) {
    console.log(req.user);
    Party.findOne({ "code": req.params.id }, function (err, party) {
        if (err) {
            console.log(err);
        }
        res.status(200).send(party);
    });
});

module.exports = router;