import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import _ from "lodash";

export async function POST() {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    return Response.json(null, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      party: {
        include: {
          winner: true,
          players: true,
        },
      },
    },
  });

  if (!user) {
    return Response.json("User does not exist", {
      status: 401,
    });
  }

  if (!user.admin) {
    return Response.json("User must be admin to start the party", {
      status: 403,
    });
  }

  if (!user.party) {
    return Response.json("User is not currently part of a party", {
      status: 400,
    });
  }

  if (user.party.players.length < 2) {
    return Response.json("Need at least two players to start party", {
      status: 400,
    });
  }

  const party = await prisma.party.update({
    where: {
      id: user.party.id,
    },
    data: {
      started: true,
      winnerId: null,
    },
    include: {
      winner: true,
      players: true,
    },
  });

  const players = _.shuffle(party.players);

  players.forEach(async (player, i) => {
    if (i === players.length - 1) {
      player.targetId = players[0].id;
    } else {
      player.targetId = players[i + 1].id;
    }

    player.alive = true;
    player.pending = false;

    await prisma.user.update({
      where: {
        id: player.id,
      },
      data: player,
    });
  });

  return Response.json(null);
}
