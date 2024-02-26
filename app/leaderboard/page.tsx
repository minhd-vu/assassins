import LeaderboardRow from "@/components/LeaderboardRow";
import prisma from "@/lib/prisma";

async function getLeaderboardUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      kills: true,
      deaths: true,
      wins: true,
    },
    orderBy: [
      {
        wins: "desc",
      },
      {
        kills: "desc",
      },
      {
        deaths: "asc",
      },
    ],
  });
}

export default async function Leaderboard() {
  const users = await getLeaderboardUsers();

  const rows = users.map((user, i) => (
    <LeaderboardRow user={user} rank={i + 1} />
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
