const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./user.model");

const partySchema = new Schema({
    code: { type: String, required: true },
    admin: { type: String, required: true },
    players: [{ player: String, target: String }],
    date: { type: Date, default: Date.now }
}, { timestamps: true });

const Party = mongoose.model("Party", partySchema);

module.exports = Party;