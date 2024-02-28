import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import _ from "lodash";
import { setPlayerTargets } from "@/lib/party";

export async function POST() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json(null, { status: 401 });
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
    return Response.json("User is not currently part of a party", {
      status: 400,
    });
  }

  if (user.id !== user.party.adminId) {
    return Response.json("You must be the admin to start the game", {
      status: 403,
    });
  }

  if (user.party.players.length < 2) {
    return Response.json("Need at least two players to start the game", {
      status: 400,
    });
  }

  const party = await prisma.party.update({
    where: {
      id: user.party.id,
    },
    data: {
      started: true,
    },
    include: {
      players: true,
    },
  });

  await setPlayerTargets(party.players);

  return Response.json(null);
}
