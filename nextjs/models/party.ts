import mongoose, { Types, Schema, Document } from "mongoose";
import { IUser } from "./User";

export interface IParty extends Document {
  code: string;
  players: Types.DocumentArray<IUser>;
  isStarted: boolean;
  gameMode: string;
  showPlayers: boolean;
  winner?: IUser;
}

const PartySchema = new Schema<IParty>(
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
      enum: ["classic"],
      default: "classic",
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
  mongoose.model<IParty>("Party", PartySchema);