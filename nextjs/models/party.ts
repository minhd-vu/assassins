import mongoose, { Types, Schema, Document } from "mongoose";
import { User } from "./User";

export interface Party extends Document {
  code: string;
  players: Types.DocumentArray<User>;
  isStarted: boolean;
  gameMode: string;
  showPlayers: boolean;
  winner?: User;
}

const PartySchema = new Schema<Party>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    players: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    isStarted: {
      type: Boolean,
      default: false,
    },
    gameMode: {
      type: String,
      default: "Classic",
    },
    showPlayers: {
      type: Boolean,
      default: true,
    },
    winner: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Party ||
  mongoose.model<Party>("Party", PartySchema);
