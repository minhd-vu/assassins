import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function POST() {
  // await Party.updateOne({ _id: req.user.party }, { $pullAll: { players: [req.user._id] } });
  // await Party.deleteOne({ players: { $exists: true, $size: 0 } });
  //
  // await req.user.execPopulate("party");
  //
  // if (req.user.party) {
  //     // Set a random player to be the new party admin.
  //     if (req.user.isAdmin) {
  //         await req.user.party.execPopulate("players");
  //         const player = req.user.party.players[Math.floor(Math.random() * req.user.party.players.length)];
  //         player.isAdmin = true;
  //         await player.save();
  //     }
  //
  //     const target = req.user.target;
  //
  //     await User.findOne({ "target": req.user._id }, async function (err, user) {
  //         if (err) console.log(err);
  //         setTargets(user, target);
  //     });
  // }
  //
  // req.user.party = null;
  // req.user.target = null;
  // req.user.isAlive = true;
  // req.user.isAdmin = false;
  //
  // await req.user.save();
  // await User.updateMany({ target: req.user }, { target: null });
  //
  // res.status(200).send();

  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json(null, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      party: {
        include: {
          winner: true,
          players: true,
        },
      },
    },
  });

  if (!user) {
    return Response.json("User does not exist", {
      status: 401,
    });
  }

  if (!user.admin) {
    return Response.json("User must be admin to start the party", {
      status: 403,
    });
  }

  if (!user.party) {
    return Response.json("User is not currently part of a party", {
      status: 400,
    });
  }

  if (user.party.players.length < 2) {
    return Response.json("Need at least two players to start party", {
      status: 400,
    });
  }

  const party = await prisma.party.update({
    where: {
      id: user.party.id,
    },
    data: {
      started: true,
      winnerId: null,
    },
    include: {
      winner: true,
      players: true,
    },
  });
}
