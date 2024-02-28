import { User } from "@prisma/client";
import PromotePlayer from "./PromotePlayer";
import KickPlayer from "./KickPlayer";
import { Party } from "@/lib/user";
import Link from "next/link";

export function AdminIcon() {
  return (
    <div className="tooltip" data-tip="Admin">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-warning"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z" fill="currentColor" />
      </svg>
    </div>
  );
}

export function AliveIcon() {
  return (
    <div className="tooltip" data-tip="Alive">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-error"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"
          strokeWidth="0"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function DeadIcon() {
  return (
    <div className="tooltip" data-tip="Dead">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 4c4.418 0 8 3.358 8 7.5c0 1.901 -.755 3.637 -2 4.96l0 2.54a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-2.54c-1.245 -1.322 -2 -3.058 -2 -4.96c0 -4.142 3.582 -7.5 8 -7.5z" />
        <path d="M10 17v3" />
        <path d="M14 17v3" />
        <path d="M9 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        <path d="M15 11m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      </svg>
    </div>
  );
}

function WinnerIcon() {
  return (
    <div className="tooltip" data-tip="Last Round's Winner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-6 h-6 text-accent"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M9 3h6l3 7l-6 2l-6 -2z" />
        <path d="M12 12l-3 -9" />
        <path d="M15 11l-3 -8" />
        <path d="M12 19.5l-3 1.5l.5 -3.5l-2 -2l3 -.5l1.5 -3l1.5 3l3 .5l-2 2l.5 3.5z" />
      </svg>
    </div>
  );
}

export default function Player({
  player,
  party,
  userId,
  isAdmin,
}: {
  player: User;
  party: Party;
  userId: string;
  isAdmin: boolean;
}) {
  return (
    <li>
      <Link
        href={`/user/${player.name}`}
        className="btn-outline border rounded-lg px-3 py-2 flex justify-between items-center"
      >
        <p>{player.name}</p>
        <div className="flex space-x-1 items-center">
          {party.winnerId === player.id && <WinnerIcon />}
          {party.adminId === player.id && <AdminIcon />}
          {party.started && (player.alive ? <AliveIcon /> : <DeadIcon />)}
          {isAdmin && userId !== player.id && (
            <>
              <PromotePlayer playerId={player.id} />
              <KickPlayer playerId={player.id} />
            </>
          )}
        </div>
      </Link>
    </li>
  );
}
