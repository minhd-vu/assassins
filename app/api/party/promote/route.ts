import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

type PartyPromoteBody = {
  playerId?: string;
};

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json("User is not authenticated", { status: 401 });
  }

  const body: PartyPromoteBody = await req.json();

  if (!body.playerId) {
    return Response.json("Must provide playerId in request body", {
      status: 400,
    });
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: session.user.email,
    },
    include: {
      party: {
        include: {
          players: true,
        },
      },
    },
  });

  if (!user.party) {
    return Response.json("You are not part of a party", {
      status: 400,
    });
  }

  if (user.party.adminId !== user.id) {
    return Response.json("You must be the party admin to promote a player", {
      status: 403,
    });
  }

  const player = user.party.players.find((e) => e.id === body.playerId);
  if (!player) {
    return Response.json("Player is not in your party", {
      status: 400,
    });
  }

  const party = await prisma.party.update({
    where: {
      id: user.party.id,
    },
    data: {
      adminId: body.playerId,
    },
  });

  return Response.json(party);
}
