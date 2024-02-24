"use client";

import _ from "lodash";
import LeaveParty from "./LeaveParty";
import CreateParty from "./CreateParty";
import JoinParty from "./JoinParty";
import StartGame from "./StartGame";
import { Party } from "@prisma/client";
import AdminBadge from "./AdminBadge";
import PartyStarted from "./PartyStarted";
import useSWR, { Fetcher } from "swr";
import { User } from "@/app/api/user/route";
import Spinner from "./Spinner";

export default function Party() {
  const fetcher: Fetcher<User, string> = (url) =>
    fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/user", fetcher, {
    refreshInterval: 500,
  });

  if (isLoading) {
    return <Spinner />;
  }

  const user = data;
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

  if (party.started) {
    return <PartyStarted user={user} />;
  }

  const players = party.players.map((player) => (
    <li key={player.id}>
      {player.name}
      {party.adminId === player.id && <AdminBadge />}
    </li>
  ));

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Code: {party.code.toUpperCase()}
      </h1>
      <h2>Mode: {_.startCase(_.toLower(party.mode))}</h2>
      <h2>Players:</h2>
      <ul>{players}</ul>
      <StartGame visible={party.adminId === user.id} />
      <LeaveParty />
    </div>
  );
}
