import prisma from "@/lib/prisma";
import _ from "lodash";
import { getServerSession } from "next-auth";

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

  if (party.started) {
    if (!user.targetedBy || !user.targetId) {
      return Response.json(null, { status: 500 });
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