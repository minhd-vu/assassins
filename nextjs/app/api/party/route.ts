import User, { IUser } from "@/models/User";
import { getServerSession } from "next-auth";

export async function GET(req: Request) {
  const session = await getServerSession();
  if (!session || !session.user) {
    return Response.json(null, { status: 401 });
  }

  console.log(session);

  const user: IUser | null = await User.findOne({ email: session.user.email });

  console.log(user);

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
  return Response.json(null);
}
