import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import _ from "lodash";
import LeaveParty from "./LeaveParty";
import CreateParty from "./CreateParty";
import JoinParty from "./JoinParty";
import StartGame from "./StartGame";

async function getUser() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return;
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      email: session.user.email,
    },
    include: {
      party: {
        include: {
          players: true,
        },
      },
    },
  });

  return user;
}

export default async function Party() {
  const user = await getUser();
  if (!user) {
    return;
  }

  const party = user.party;
  if (!party) {
    return (
      <>
        <JoinParty />
        <CreateParty />
      </>
    );
  }

  return (
    <>
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Code: {party.code.toUpperCase()}
        </h1>
        <h2>Mode: {_.startCase(_.toLower(party.mode))}</h2>
        <h2>Players:</h2>
        <ul>
          {party.players.map((player) => (
            <li key={player.id}>
              {player.name}
              {party.adminId === player.id && (
                <span className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                  Admin
                </span>
              )}
            </li>
          ))}
        </ul>
        {party.adminId === user.id && <StartGame />}
        <LeaveParty />
      </div>
    </>
  );
}
