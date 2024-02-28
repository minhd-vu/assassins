import prisma from "@/lib/prisma";
import { Mode } from "@prisma/client";
import { customAlphabet } from "nanoid";
import { getServerSession } from "next-auth";

const nanoid = customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", 6);

export async function GET() {
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
    },
  });

  if (!user.party) {
    return Response.json("User is not in a party", { status: 201 });
  }

  return Response.json(user.party);
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
  });

  if (user.partyId !== null) {
    return Response.json("User must leave before creating a new party", {
      status: 400,
    });
  }

  const party = await prisma.party.create({
    data: {
      code: nanoid(),
      mode: Mode.CLASSIC,
      adminId: user.id,
    },
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

type PartyPatchBody = {
  mode?: Mode;
};

export async function PATCH(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json("User is not authenticated", { status: 401 });
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
    return Response.json("User is not in a party", {
      status: 400,
    });
  }

  if (user.party.started) {
    return Response.json("Cannot update mode of started parties", {
      status: 400,
    });
  }

  if (user.party.adminId !== user.id) {
    return Response.json("User must be the admin to adjust party settings", {
      status: 403,
    });
  }

  const body: PartyPatchBody = await req.json();
  if (!body.mode) {
    return Response.json("Party mode is required", {
      status: 400,
    });
  }

  const party = await prisma.party.update({
    where: {
      id: user.party.id,
    },
    data: {
      mode: body.mode,
    },
  });

  return Response.json(party);
}
