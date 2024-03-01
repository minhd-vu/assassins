import prisma from "./prisma";

export type User = NonNullable<Awaited<ReturnType<typeof getUser>>>;
export type Party = NonNullable<User["party"]>;

export type UserBody = {
  name?: string;
};

type BooleanObject<T> = {
  [K in keyof T]?: boolean;
};

export const exclude = <T>(
  fields: T,
  excludes: (keyof T)[],
): BooleanObject<T> => {
  const object: BooleanObject<T> = {};
  const keys = Object.keys(fields!).filter(
    (key) => !excludes.includes(key as keyof T),
  ) as (keyof T)[];

  for (let key of keys) {
    object[key] = true;
  }

  return object;
};

const select = exclude(prisma.user.fields, ["email"]);

export async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      target: {
        select,
      },
      party: {
        include: {
          players: {
            select,
          },
          winner: {
            select,
          },
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
