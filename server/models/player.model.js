const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlayerSchema = new mongoose.Schema({
    player: { type: Schema.Types.ObjectId, ref: "User", required: true },
    target: { type: Schema.Types.ObjectId, ref: "User" },
    party: { type: Schema.Types.ObjectId, ref: "Party" },
    isAlive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false }
});

module.exports = mongoose.model("Player", PlayerSchema);