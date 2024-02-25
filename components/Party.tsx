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
      <div className="card w-96 bg-base-300 shadow-xl">
        <div className="card-body">
          <h1 className="card-title">Code: {party.code.toUpperCase()}</h1>
          <h2>Target: {user.target.name}</h2>
          {party.adminId === user.id && <StopGame />}
          <LeaveParty />
        </div>
      </div>
    );
  }

  const players = party.players.map((player) => (
    <li key={player.id}>
      <p>
        {player.name}
        {party.adminId === player.id && <AdminBadge />}
      </p>
    </li>
  ));

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="card-title">Code: {party.code.toUpperCase()}</h1>
        <h2>Mode: {_.startCase(_.toLower(party.mode))}</h2>
        <h2>Players:</h2>
        <ul>{players}</ul>
        <div className="card-actions justify-center">
          <StartGame visible={party.adminId === user.id} />
          <LeaveParty />
        </div>
      </div>
    </div>
  );
}
