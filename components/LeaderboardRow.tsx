"use client";

import { LeaderboardUser } from "@/lib/user";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LeaderboardRow({
  user,
  rank,
}: {
  user: LeaderboardUser;
  rank: number;
}) {
  const router = useRouter();

  async function onClick() {
    router.push(`/user/${user.name}`);
  }

  return (
    <tr className="hover" onClick={() => onClick()}>
      <td>{rank}</td>
      <td>
        <Link className="link link-primary" href={`/user/${user.name}`}>
          {user.name}
        </Link>
      </td>
      <td>{user.kills}</td>
      <td>{user.deaths}</td>
      <td>{user.wins}</td>
    </tr>
  );
}
