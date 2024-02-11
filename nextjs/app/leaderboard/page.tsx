import { getLeaderboardUsers } from "../api/leaderboard/route";

export default async function Leaderboard() {
  const users = await getLeaderboardUsers();

  return <div>{JSON.stringify(users)}</div>;
}
