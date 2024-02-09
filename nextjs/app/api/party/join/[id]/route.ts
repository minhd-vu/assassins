import Party, { IParty } from "@/models/Party";
import User, { IUser } from "@/models/User";
import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession();
  if (!session || !session.user) {
    return Response.json(null, { status: 401 });
  }

  const user: IUser | null = await User.findOne({ email: session.user.email });
  if (!user) {
    return Response.json(null, { status: 500 });
  }

  const party: IParty | null = await Party.findOne({ code: params.id });

  if (!party) {
    return Response.json(null, { status: 400 });
  } else if (party.isStarted) {
    return Response.json(null, { status: 403 });
  }

  if (!party.players.some((player) => player.equals(user.id))) {
    user.party = party.id;
    await user.save();

    party.players.push(user.id);
    await party.save();
  }

  await party.populate("players");

  return Response.json(party);
}
