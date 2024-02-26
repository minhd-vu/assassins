import _ from "lodash";
import prisma from "./prisma";

export async function removePlayer(email: string) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
    include: {
      party: {
        include: {
          players: true,
        },
      },
      targetedBy: true,
    },
  });

  if (!user.party) {
    return Response.json("User is not currently part of a party", {
      status: 400,
    });
  }

  let party = user.party;

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      partyId: null,
      targetId: null,
    },
  });

  party = await prisma.party.findFirstOrThrow({
    where: {
      id: party.id,
    },
    include: {
      players: true,
    },
  });

  if (party.players.length === 0) {
    await prisma.party.delete({ where: { id: party.id } });
    return Response.json(party);
  }

  const players = party.players.filter((e) => e.alive);
  if (party.started && players.length === 1) {
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

  if (party.started) {
    if (!user.targetId) {
      return Response.json("User has no target", { status: 500 });
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
      },
    });
  }

  if (user.id === user.party.adminId) {
    const users = await prisma.user.findMany({
      where: {
        partyId: party.id,
      },
      include: {
        party: true,
      },
    });

    const random = _.sample(users)!;

    party = await prisma.party.update({
      where: {
        id: random.party!.id,
      },
      data: {
        adminId: random.id,
        started: party.players.length > 0 ? party.started : false,
      },
      include: {
        players: true,
      },
    });
  }

  return Response.json(party);
}
