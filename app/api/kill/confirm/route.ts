import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json(null, { status: 401 });
  }

  let user = await prisma.user.findUniqueOrThrow({
    where: {
      email: session.user.email,
    },
    include: {
      targetedBy: true,
      party: true,
    },
  });

  if (!user.party) {
    return Response.json("User is not in a party", { status: 400 });
  }

  if (!user.party.started) {
    return Response.json("Party has not started", { status: 400 });
  }

  if (!user.pending) {
    return Response.json("User must be pending in order to confirm", {
      status: 400,
    });
  }

  if (!user.targetedBy) {
    return Response.json("User is not targetted by anyone", { status: 500 });
  }

  await prisma.user.update({
    where: {
      id: user.targetedBy.id,
    },
    data: {
      targetId: user.targetId,
      kills: {
        increment: 1,
      },
    },
  });

  const { party } = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      alive: false,
      pending: false,
      targetId: null,
      deaths: {
        increment: 1,
      },
    },
    include: {
      party: {
        include: {
          players: true,
        },
      },
    },
  });

  if (!party) {
    return Response.json("Party not found", { status: 500 });
  }

  const players = party.players.filter((e) => e.alive);
  if (players.length < 2) {
    await prisma.party.update({
      where: {
        id: party.id,
      },
      data: {
        started: false,
        winnerId: players[0].id,
      },
    });

    await prisma.user.update({
      where: {
        id: players[0].id,
      },
      data: {
        wins: players[0].wins + 1,
      },
    });
  }

  return Response.json(null);
}
