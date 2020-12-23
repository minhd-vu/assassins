const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartySchema = new Schema({
    code: { type: String, required: true },
    players: [{ type: Schema.Types.ObjectId, ref: "Player" }],
    isStarted: {type: Boolean, default: false}
}, { timestamps: true });

const Party = mongoose.model("Party", PartySchema);

module.exports = Party;