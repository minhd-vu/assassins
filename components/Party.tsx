"use client";

import _ from "lodash";
import LeaveParty from "./LeaveParty";
import CreateParty from "./CreateParty";
import JoinParty from "./JoinParty";
import StartGame from "./StartGame";
import { Party } from "@prisma/client";
import AdminBadge from "./AdminBadge";
import useSWR, { Fetcher } from "swr";
import { User } from "@/app/api/user/route";
import Spinner from "./Spinner";
import StopGame from "./StopGame";
import Alert from "./Alert";
import PromotePlayer from "./PromotePlayer";
import RemovePlayer from "./RemovePlayer";
import KillTarget from "./KillTarget";

export default function Party() {
  const fetcher: Fetcher<User, string> = (url) =>
    fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/user", fetcher, {
    refreshInterval: 500,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert>{JSON.stringify(error)}</Alert>;
  }

  const user = data;
  if (!user) {
    return;
  }

  const party = user.party;
  if (!party) {
    return (
      <div className="">
        <JoinParty />
        <CreateParty />
      </div>
    );
  }

  if (party.started) {
    if (!user.target) {
      throw new Error("User does not have a target");
    }

    return (
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-3xl">
            Code: {party.code.toUpperCase()}
          </h1>
          <h2>Target: {user.target.name}</h2>
          <div className="card-actions justify-center">
            <KillTarget />
            {party.adminId === user.id && <StopGame />}
            <LeaveParty />
          </div>
        </div>
      </div>
    );
  }

  const isAdmin = party.adminId === user.id;

  const players = party.players.map((player) => {
    const isUser = user.id === player.id;

    return (
      <li key={player.id}>
        <div className="border rounded-lg px-3 py-2 flex justify-between items-center">
          <span className="flex items-center">
            {player.name}
            {party.adminId === player.id && <AdminBadge />}
          </span>
          <div className="flex space-x-1">
            {isAdmin && !isUser && (
              <>
                <PromotePlayer playerId={player.id} />
                <RemovePlayer playerId={player.id} />
              </>
            )}
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title text-3xl">
          Code: {party.code.toUpperCase()}
        </h1>
        <h2>Mode: {_.startCase(_.toLower(party.mode))}</h2>
        {!isAdmin && (
          <p className="text-sm">
            Waiting for party leader to start the party...
          </p>
        )}
        <h2>Players:</h2>
        <ul className="space-y-2">{players}</ul>
        <div className="card-actions justify-center">
          {isAdmin && <StartGame />}
          <LeaveParty />
        </div>
      </div>
    </div>
  );
}
