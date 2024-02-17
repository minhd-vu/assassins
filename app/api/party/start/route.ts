import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import _ from "lodash";

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
    return Response.json("User must be admin to start the party", {
      status: 403,
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
    },
    include: {
      players: true,
    },
  });

  const players = _.shuffle(party.players);

  for (let i = 0; i < players.length; i++) {
    let targetId: string;
    if (i === players.length - 1) {
      targetId = players[0].id;
    } else {
      targetId = players[i + 1].id;
    }

    await prisma.user.update({
      where: {
        id: players[i].id,
      },
      data: {
        alive: true,
        pending: false,
        targetId,
      },
    });
  }

  return Response.json(null);
}
