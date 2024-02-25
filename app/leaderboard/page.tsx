import prisma from "@/lib/prisma";

async function getLeaderboardUsers() {
  return await prisma.user.findMany({
    select: {
      name: true,
      kills: true,
      deaths: true,
      wins: true,
    },
    orderBy: [
      {
        wins: "asc",
      },
      {
        kills: "asc",
      },
      {
        deaths: "desc",
      },
    ],
  });
}

export default async function Leaderboard() {
  const users = await getLeaderboardUsers();

  const rows = users.map((user, i) => (
    <tr key={user.name} className="hover">
      <th>{i + 1}</th>
      <th>{user.name}</th>
      <td>{user.kills}</td>
      <td>{user.deaths}</td>
      <td>{user.wins}</td>
    </tr>
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
