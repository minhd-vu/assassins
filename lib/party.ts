import _ from "lodash";
import prisma from "./prisma";

export type PartyJoinBody = {
  code?: string;
};

export async function removePlayer(email: string) {
  const user = await getUser(email);
  if (!user) {
    return Response.json("User not found, try logging in again", {
      status: 401,
    });
  }

  if (!user.party) {
    return Response.json("User is not currently part of a party", {
      status: 400,
    });
  }

  await removePlayerFromParty(user);

  const party = await getParty(user.party.id);
  if (!party) {
    return Response.json("Party no longer exists", { status: 500 });
  }

  if (!party.players.length) {
    await prisma.party.delete({
      where: {
        id: party.id,
      },
    });

    return Response.json(null);
  }

  await updateAdmin(user);

  if (!party.started) {
    return Response.json(null);
  }

  if (await updateWinner(party)) {
    return Response.json(null);
  }

  return updateTarget(user);
}

type User = NonNullable<Awaited<ReturnType<typeof getUser>>>;

async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      party: true,
      targetedBy: true,
    },
  });
}

type Party = NonNullable<Awaited<ReturnType<typeof getParty>>>;

async function getParty(id: string) {
  return await prisma.party.findUnique({
    where: {
      id,
    },
    include: {
      players: true,
    },
  });
}

async function removePlayerFromParty(user: User) {
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      partyId: null,
      targetId: null,
      alive: false,
      pending: false,
    },
  });
}

async function updateAdmin(user: User) {
  if (!user.party) {
    return;
  }

  if (user.id === user.party.adminId) {
    const users = await prisma.user.findMany({
      where: {
        partyId: user.party.id,
      },
      include: {
        party: true,
      },
    });

    const random = _.sample(users)!;
    await prisma.party.update({
      where: {
        id: random.party!.id,
      },
      data: {
        adminId: random.id,
      },
    });
  }
}

async function updateWinner(party: Party) {
  const players = party.players.filter((e) => e.alive);

  if (players.length !== 1) {
    return false;
  }

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

  return true;
}

async function updateTarget(user: User) {
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

  return Response.json(null);
}
