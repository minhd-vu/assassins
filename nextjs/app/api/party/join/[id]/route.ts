import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json(null, { status: 401 });
  }

  let party = await prisma.party.findUnique({
    where: {
      code: params.id,
    },
  });

  if (!party) {
    return Response.json(`Failed to find party with code ${params.id}`, {
      status: 400,
    });
  }

  if (party.started) {
    return Response.json(`Cannot join party that has already started`, {
      status: 403,
    });
  }

  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      partyId: party.id,
    },
  });

  party = await prisma.party.findUnique({
    where: {
      code: params.id,
    },
    include: {
      players: true,
    },
  });

  return Response.json(party);
}
