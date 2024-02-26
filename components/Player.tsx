import { User } from "@prisma/client";
import PromotePlayer from "./PromotePlayer";
import KickPlayer from "./KickPlayer";
import { Party } from "@/lib/user";

export function AdminBadge() {
  return <span className="badge badge-primary">admin</span>;
}

export function AliveBadge() {
  return <span className="badge badge-success">alive</span>;
}

export function DeadBadge() {
  return <span className="badge badge-error">dead</span>;
}

export default function Player({
  player,
  isAdmin,
  userId,
  party,
}: {
  player: User;
  isAdmin: boolean;
  userId: string;
  party: Party;
}) {
  return (
    <li>
      <div className="border rounded-lg px-3 py-2 flex justify-between items-center">
        <p>{player.name}</p>
        <div className="flex space-x-1 items-center">
          {party.adminId === player.id && <AdminBadge />}
          {party.started && (player.alive ? <AliveBadge /> : <DeadBadge />)}
          {isAdmin && userId !== player.id && (
            <>
              <PromotePlayer playerId={player.id} />
              <KickPlayer playerId={player.id} />
            </>
          )}
        </div>
      </div>
    </li>
  );
}
