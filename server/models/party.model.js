const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartySchema = new Schema({
    code: { type: String, required: true, unique: true },
    players: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isStarted: { type: Boolean, default: false },
    gameMode: { type: String, default: "Classic" }
}, { timestamps: true });

const Party = mongoose.model("Party", PartySchema);

module.exports = Party;