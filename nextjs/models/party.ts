import mongoose from "mongoose";
import { User } from "./user";

export interface Party extends mongoose.Document {
  code: string;
  players: User[];
  isStarted: boolean;
  gameMode: string;
  showPlayers: boolean;
  winner: User;
}

const PartySchema = new mongoose.Schema<Party>(
  {
    code: { type: String, required: true, unique: true },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isStarted: { type: Boolean, default: false },
    gameMode: { type: String, default: "Classic" },
    showPlayers: { type: Boolean, default: true },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Party ||
  mongoose.model<Party>("Party", PartySchema);
