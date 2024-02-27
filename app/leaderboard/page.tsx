import LeaderboardRow from "@/components/LeaderboardRow";
import { getLeaderboardUsers } from "@/lib/user";

export default async function Leaderboard() {
  const users = await getLeaderboardUsers();

  const rows = users.map((user, i) => (
    <LeaderboardRow key={i} user={user} rank={i + 1} />
  ));

  return (
    <div className="overflow-x-auto bg-base-300 mx-4 rounded-xl">
      <table className="table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Kills</th>
            <th>Deaths</th>
            <th>Wins</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
