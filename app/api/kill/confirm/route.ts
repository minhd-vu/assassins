import { setPlayerTargets } from "@/lib/party";
import prisma from "@/lib/prisma";
import _ from "lodash";
import { getServerSession } from "next-auth";

export async function POST() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json(null, { status: 401 });
  }

  let user = await getUser(session.user.email);

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

  switch (user.party.mode) {
    case "CLASSIC":
      setTargetClassic(user);
      break;
    case "SHUFFLE":
      setTargetShuffle(user);
      break;
    default:
      return Response.json("Party does not have a valid mode", {
        status: 500,
      });
  }

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

export type User = NonNullable<Awaited<ReturnType<typeof getUser>>>;

async function getUser(email: string) {
  return await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
    include: {
      targetedBy: true,
      party: {
        include: {
          players: true,
        },
      },
    },
  });
}

async function setTargetClassic(user: User) {
  return await prisma.user.update({
    where: {
      id: user.targetedBy!.id,
    },
    data: {
      targetId: user.targetId,
      kills: {
        increment: 1,
      },
    },
  });
}

async function setTargetShuffle(user: User) {
  const players = user.party!.players.filter(
    (p) => p.alive && p.id !== user.targetId,
  );
  await setPlayerTargets(players);
}
