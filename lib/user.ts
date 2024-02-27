import prisma from "./prisma";

export type User = Awaited<ReturnType<typeof getUser>>;
export type Party = NonNullable<User["party"]>;

export type UserBody = {
  name?: string;
};

export async function getUser(email: string) {
  return await prisma.user.findUniqueOrThrow({
    where: {
      email,
    },
    include: {
      target: true,
      party: {
        include: {
          players: true,
          winner: true,
        },
      },
    },
  });
}

export type LeaderboardUsers = Awaited<ReturnType<typeof getLeaderboardUsers>>;
export type LeaderboardUser = LeaderboardUsers[0];

export async function getLeaderboardUsers() {
  return await prisma.user.findMany({
    where: {
      name: {
        not: null,
      },
    },
    select: {
      name: true,
      kills: true,
      deaths: true,
      wins: true,
    },
    orderBy: [
      {
        wins: "desc",
      },
      {
        kills: "desc",
      },
      {
        deaths: "asc",
      },
    ],
  });
}
