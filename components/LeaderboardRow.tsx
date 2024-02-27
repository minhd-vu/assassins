"use client";

import { LeaderboardUser } from "@/lib/user";
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
      <th>{rank}</th>
      <th>{user.name}</th>
      <td>{user.kills}</td>
      <td>{user.deaths}</td>
      <td>{user.wins}</td>
    </tr>
  );
}
