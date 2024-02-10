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
  if (!session || !session.user) {
    return Response.json(null, { status: 401 });
  }

  const code = nanoid();
  const party = await prisma.party.create({
    data: {
      code: code,
      mode: Mode.CLASSIC,
    } as Party,
  });

  return Response.json(party);
}
