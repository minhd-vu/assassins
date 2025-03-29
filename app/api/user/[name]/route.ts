import prisma from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;
  const users = await prisma.user.findMany({
    where: {
      name: {
        equals: name,
        mode: "insensitive",
      },
    },
    select: {
      name: true,
      kills: true,
      deaths: true,
      wins: true,
    },
  });

  if (users.length > 1) {
    return Response.json(`More than one user with name ${name} found`, {
      status: 500,
    });
  }

  if (users.length === 0) {
    return Response.json(`Could not find user with name ${name}`, {
      status: 400,
    });
  }

  return Response.json(users[0]);
}
