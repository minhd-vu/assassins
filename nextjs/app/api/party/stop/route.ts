import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json(null, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    return Response.json("User does not exist", {
      status: 400,
    });
  }

  if (!user.admin) {
    return Response.json("User must be admin to stop the party", {
      status: 403,
    });
  }

  if (!user.partyId) {
    return Response.json("User is not currently part of a party", {
      status: 400,
    });
  }

  const party = await prisma.party.update({
    where: {
      id: user.partyId,
    },
    data: {
      started: false,
    },
  });

  return Response.json(party);
}
