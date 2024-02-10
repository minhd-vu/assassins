import prisma from "@/lib/prisma";
import { Mode, Party } from "@prisma/client";
import { customAlphabet } from "nanoid";
import { getServerSession } from "next-auth";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);

export async function GET() {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    return Response.json(null, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      party: {
        include: {
          winner: true,
          players: true,
        },
      },
    },
  });

  return Response.json(user);
}

export async function POST() {
  const session = await getServerSession();
  if (!session || !session.user || !session.user.email) {
    return Response.json(null, { status: 401 });
  }

  const party = await prisma.party.create({
    data: {
      code: nanoid(),
      mode: Mode.CLASSIC,
    } as Party,
  });

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
      id: party.id,
    },
    include: {
      players: true,
    },
  });

  return Response.json(res);
}
