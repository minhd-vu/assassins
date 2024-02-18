import _ from "lodash";
import LeaveParty from "./LeaveParty";
import { User } from "./Party";
import StartGame from "./StartGame";
import StopGame from "./StopGame";

export default function PartyStarted({ user }: { user: User }) {
  if (!user) {
    throw new Error("User does not exist");
  }

  if (!user.party) {
    throw new Error("User is not party of a party");
  }

  if (!user.party.started) {
    throw new Error("Party has not started");
  }

  if (!user.target) {
    throw new Error("User does not have a target");
  }

  const party = user.party;

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Code: {party.code.toUpperCase()}
      </h1>
      <h2>Mode: {_.startCase(_.toLower(party.mode))}</h2>
      <h2>Target:</h2>
      <ul>{user.target.name}</ul>
      {party.adminId === user.id && <StopGame />}
      <LeaveParty />
    </div>
  );
}
