const router = require("express").Router();
const isLoggedIn = require("../helpers/isLoggedIn");
let Party = require("../models/party.model");

router.route("/:id").get(isLoggedIn, function (req, res) {
    console.log(req.user);
});

module.exports = router;