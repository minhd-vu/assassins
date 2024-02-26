"use client";

import _ from "lodash";
import LeaveParty from "./LeaveParty";
import CreateParty from "./CreateParty";
import JoinParty from "./JoinParty";
import StartGame from "./StartGame";
import { Party } from "@prisma/client";
import useSWR, { Fetcher } from "swr";
import Spinner from "./Spinner";
import StopGame from "./StopGame";
import Alert from "./Alert";
import KillTarget from "./KillTarget";
import PartyCard from "./PartyCard";
import { User } from "@/lib/user";
import ConfirmKill from "./ConfirmKill";
import DenyKill from "./DenyKill";
import Player from "./Player";

export default function Party() {
  const fetcher: Fetcher<User, string> = (url) =>
    fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR("/api/user", fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Alert>{JSON.stringify(error)}</Alert>;
  }

  const user = data;
  if (!user) {
    return <Alert>User not found. Try logging in.</Alert>;
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

  const isAdmin = party.adminId === user.id;

  if (party.started) {
    if (!user.target || !user.alive) {
      const players = party.players.map((player, i) => (
        <Player
          key={i}
          player={player}
          isAdmin={isAdmin}
          userId={user.id}
          party={party}
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
      isAdmin={isAdmin}
      userId={user.id}
      party={party}
    />
  ));

  return (
    <PartyCard code={party.code}>
      {party.winner && <h2>{`Last Round's Winner: ${party.winner.name}`}</h2>}
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
    </PartyCard>
  );
}
