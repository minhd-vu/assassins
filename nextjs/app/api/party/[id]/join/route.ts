import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    return Response.json(null, { status: 401 });
  }

  const party = await prisma.party.findUnique({
    where: {
      code: params.id,
    },
  });

  if (!party) {
    return Response.json(party, { status: 400 });
  }

  if (party.started) {
    return Response.json(party, { status: 403 });
  }

  await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      partyId: party.id,
    },
  });

  const res = await prisma.party.findUnique({
    where: {
      code: params.id,
    },
    include: {
      players: true,
    },
  });

  return Response.json(res);
}
