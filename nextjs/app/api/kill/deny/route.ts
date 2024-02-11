import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json(null, { status: 401 });
  }

  const user = await prisma.user.update({
    where: {
      email: session.user.email,
    },
    data: {
      pending: false,
    },
  });

  return Response.json(user);
}
