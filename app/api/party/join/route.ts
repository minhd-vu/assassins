import { PartyJoinBody } from "@/lib/party";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json(null, { status: 401 });
  }

  const body: PartyJoinBody = await req.json();
  if (!body.code) {
    return Response.json("No party code provided", {
      status: 400,
    });
  }
  const code = body.code;

  let party = await prisma.party.findUnique({
    where: {
      code,
    },
  });

  if (!party) {
    return Response.json(`Failed to find party with code ${code}`, {
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
      code,
    },
    include: {
      players: true,
    },
  });

  return Response.json(party);
}
