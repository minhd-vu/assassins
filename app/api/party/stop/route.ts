import prisma from "@/lib/prisma";
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
      party: true,
    },
  });

  if (!user.party) {
    return Response.json("User is not currently part of a party", {
      status: 400,
    });
  }

  if (user.id !== user.party.adminId) {
    return Response.json("User must be admin to stop the party", {
      status: 403,
    });
  }

  const party = await prisma.party.update({
    where: {
      id: user.party.id,
    },
    data: {
      started: false,
    },
  });

  return Response.json(party);
}
