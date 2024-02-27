import prisma from "@/lib/prisma";

export async function GET(
  _: Request,
  { params }: { params: { name: string } },
) {
  const users = await prisma.user.findMany({
    where: {
      name: {
        equals: params.name,
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
    return Response.json(`More than one user with name ${params.name} found`, {
      status: 500,
    });
  }

  if (users.length === 0) {
    return Response.json(`Could not find user with name ${params.name}`, {
      status: 400,
    });
  }

  return Response.json(users[0]);
}
