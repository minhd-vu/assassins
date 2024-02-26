import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json(null, { status: 401 });
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: session.user.email,
    },
  });

  return Response.json(user.pending);
}

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
    return Response.json("User is not in a party", { status: 400 });
  }

  if (!user.party.started) {
    return Response.json("Party has not started", { status: 400 });
  }

  if (!user.targetId) {
    return Response.json("User does not have a target", { status: 400 });
  }

  const target = await prisma.user.update({
    where: {
      id: user.targetId,
    },
    data: {
      pending: true,
    },
  });

  return Response.json(target);
}
