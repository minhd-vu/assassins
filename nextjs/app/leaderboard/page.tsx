import prisma from "@/lib/prisma";

export async function getLeaderboardUsers() {
  return await prisma.user.findMany({
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
}

export default async function Leaderboard() {
  const users = await getLeaderboardUsers();
  return <div>{JSON.stringify(users)}</div>;
}
