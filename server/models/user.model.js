const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    username: String,
    password: String,
    target: { type: Schema.Types.ObjectId, ref: "User", default: null },
    party: { type: Schema.Types.ObjectId, ref: "Party", default: null },
    isAlive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);