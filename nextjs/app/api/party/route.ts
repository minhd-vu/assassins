import Party, { IParty } from "@/models/Party";
import User, { IUser } from "@/models/User";
import { customAlphabet } from "nanoid";
import { getServerSession } from "next-auth";
const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);

export async function GET() {
  const session = await getServerSession();
  if (!session || !session.user) {
    return Response.json(null, { status: 401 });
  }

  const user: IUser | null = await User.findOne({ email: session.user.email });
  if (!user) {
    return Response.json(null, { status: 500 });
  }

  if (user.party) {
    await user.populate("party");
    await user.party.populate("players");
    await user.party.populate("winner");
  }

  return Response.json(user.party);
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session || !session.user) {
    return Response.json(null, { status: 401 });
  }

  const user: IUser | null = await User.findOne({ email: session.user.email });
  if (!user) {
    return Response.json(null, { status: 500 });
  }

  let party: IParty | null;
  let code: string;
  do {
    code = nanoid();
    party = await Party.findOne({ email: session.user.email });
  } while (party);

  party = new Party({ code: code }) as IParty;
  party.players.push(user);

  try {
    await party.save();
  } catch (err: any) {
    if (err.code === "11000") {
      return POST(req);
    } else {
      throw err;
    }
  }

  user.isAdmin = true;
  user.party = party;

  await user.save();

  return Response.json(party);
}
