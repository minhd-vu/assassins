import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST() {
  //   if (req.user.isPending) {
  //
  //     const target = req.user.target;
  //
  //     // Reset the player that died
  //     req.user.isAlive = false;
  //     req.user.isPending = false;
  //     req.user.target = null;
  //     req.user.stats.deaths++;
  //     await req.user.save();
  //
  //     await User.findOne({ "target": req.user._id }, async function (err, user) {
  //         if (err) console.log(err);
  //         user.stats.elims++;
  //         setTargets(user, target);
  //     });
  // }
  // res.status(200).send();

  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json(null, { status: 401 });
  }

  let user = await prisma.user.findUniqueOrThrow({
    where: {
      email: session.user.email,
    },
    include: {
      targetedBy: true,
    },
  });

  if (!user.pending) {
    return Response.json("User must be pending in order to confirm", {
      status: 400,
    });
  }

  if (!user.targetedBy) {
    return Response.json(user, { status: 500 });
  }

  await prisma.user.update({
    where: {
      id: user.targetedBy.id,
    },
    data: {
      targetId: user.targetId,
      kills: {
        increment: 1,
      },
    },
  });

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      alive: false,
      pending: false,
      targetId: null,
      deaths: {
        increment: 1,
      },
    },
  });

  return Response.json(null);
}
