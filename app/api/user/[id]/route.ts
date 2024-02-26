import prisma from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      name: true,
      kills: true,
      deaths: true,
      wins: true,
    },
  });

  if (!user) {
    return Response.json(`Could not find user with id ${params.id}`, {
      status: 400,
    });
  }

  return Response.json(user);
}
