const mongoose = require("mongoose");
const User = require("./user.model");

const Schema = mongoose.Schema;

const partySchema = new Schema({
    code: { type: String, required: true },
    admin: { type: User, required: true },
    players: [{ player: User, target: User }],
    date: { type: Date, default: Date.now }
}, {
    timestamps: true,
});

const Party = mongoose.model("Party", partySchema);

module.exports = Party;