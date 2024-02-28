"use client";

import _ from "lodash";
import JoinParty from "./JoinParty";
import { Party } from "@prisma/client";
import useSWR, { Fetcher } from "swr";
import PartyCard from "./PartyCard";
import { User } from "@/lib/user";
import Player from "./Player";
import NameForm from "./NameForm";
import { useContext } from "react";
import { ErrorContext } from "./App";
import {
  ConfirmKill,
  CreateParty,
  DenyKill,
  KillTarget,
  LeaveParty,
  StartGame,
  StopGame,
} from "./Button";
import SelectMode from "./SelectMode";

export default function Party() {
  const fetcher: Fetcher<User, string> = (url) =>
    fetch(url).then((res) => res.json());
  const { setError } = useContext(ErrorContext);

  const { data, error, isLoading } = useSWR("/api/user", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) {
    return <span className="loading loading-spinner loading-lg" />;
  }

  if (error) {
    setError(error);
    return;
  }

  const user = data;
  if (!user) {
    setError("User not found, try logging in again");
    return;
  }

  if (!user.name) {
    return <NameForm />;
  }

  const party = user.party;
  if (!party) {
    return (
      <div className="text-center space-y-2">
        <JoinParty />
        <p className="text-2xl font-bold">or</p>
        <CreateParty />
      </div>
    );
  }

  const isAdmin = party.adminId === user.id;

  if (party.started) {
    if (!user.target || !user.alive) {
      const players = party.players.map((player, i) => (
        <Player
          key={i}
          player={player}
          party={party}
          userId={user.id}
          isAdmin={isAdmin}
        />
      ));

      return (
        <PartyCard code={party.code}>
          <p className="text-sm">
            You have died, waiting for round to finish...
          </p>
          <ul className="space-y-2">{players}</ul>
          <div className="card-actions justify-center">
            {isAdmin && <StopGame />}
            <LeaveParty />
          </div>
        </PartyCard>
      );
    }

    return (
      <PartyCard code={party.code}>
        <h2>Target: {user.target.name}</h2>
        <div className="card-actions justify-center">
          {user.pending ? (
            <>
              <ConfirmKill />
              <DenyKill />
            </>
          ) : (
            <KillTarget pending={user.target.pending} />
          )}
          {party.adminId === user.id && <StopGame />}
          <LeaveParty />
        </div>
      </PartyCard>
    );
  }

  const players = party.players.map((player, i) => (
    <Player
      key={i}
      player={player}
      userId={user.id}
      party={party}
      isAdmin={isAdmin}
    />
  ));

  return (
    <PartyCard code={party.code}>
      {party.winner && <h2>{`Last Round's Winner: ${party.winner.name}`}</h2>}
      {isAdmin ? (
        <SelectMode mode={party.mode} />
      ) : (
        <h2>Mode: {_.startCase(_.toLower(party.mode))}</h2>
      )}
      {!isAdmin && (
        <p className="text-sm italic">
          Waiting for party leader to start the party{" "}
          <span className="loading loading-dots loading-xs align-bottom" />
        </p>
      )}
      <h2 className="font-bold text-xl">Players:</h2>
      <ul className="space-y-2">{players}</ul>
      <div className="card-actions justify-center">
        {isAdmin && <StartGame />}
        <LeaveParty />
      </div>
    </PartyCard>
  );
}
