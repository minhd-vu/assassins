import mongoose, { Document, Schema, Types } from "mongoose";
import { Party } from "./Party";

export interface User extends Document {
  email: string;
  name: string;
  target: User;
  party: Party;
  isAlive: boolean;
  isPending: boolean;
  isAdmin: boolean;
  stats: {
    elims: number;
    deaths: number;
    wins: number;
  };
}

const UserSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    target: {
      type: Types.ObjectId,
      ref: "User",
      default: null,
    },
    party: {
      type: Types.ObjectId,
      ref: "Party",
      default: null,
    },
    isAlive: {
      type: Boolean,
      default: true,
    },
    isPending: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    stats: {
      elims: {
        type: Number,
        default: 0,
      },
      deaths: {
        type: Number,
        default: 0,
      },
      wins: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.User || mongoose.model<User>("User", UserSchema);
