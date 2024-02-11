import prisma from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      kills: true,
      deaths: true,
      wins: true,
    },
    orderBy: [
      {
        wins: "asc",
      },
      {
        kills: "asc",
      },
      {
        deaths: "desc",
      },
    ],
  });

  return Response.json(users);
}
