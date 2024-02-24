import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

async function getUser(email: string) {
  return await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
    include: {
      target: true,
      party: {
        include: {
          players: true,
        },
      },
    },
  });
}

export type User = Awaited<ReturnType<typeof getUser>>;

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json(null, { status: 401 });
  }

  const user = await getUser(session.user.email);
  return Response.json(user);
}
