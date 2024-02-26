import prisma from "./prisma";

export type User = Awaited<ReturnType<typeof getUser>>;

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
