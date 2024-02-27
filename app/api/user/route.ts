import { UserBody, getUser } from "@/lib/user";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json("User is not authenticated", { status: 401 });
  }

  const user = await getUser(session.user.email);
  if (!user) {
    return Response.json("User could not be found", { status: 500 });
  }

  return Response.json(user);
}

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json(null, { status: 401 });
  }

  const body: UserBody = await req.json();
  const name = body.name?.trim();

  if (!name) {
    return Response.json("Name cannot be empty", { status: 400 });
  }

  if (!name.match(/^[0-9a-zA-Z]+$/)) {
    return Response.json("Name must be alphanumeric", { status: 400 });
  }

  if (name.length > 16) {
    return Response.json("Name must be <= 16 characters", { status: 400 });
  }

  let user = await prisma.user.findFirst({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
  });

  if (user) {
    return Response.json("Name is already taken", { status: 400 });
  }

  user = await prisma.user.update({
    where: { email: session.user.email },
    data: {
      name,
    },
  });

  return Response.json(user);
}
