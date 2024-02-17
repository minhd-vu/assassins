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

  const rows = users.map((user) => (
    <tr
      key={user.name}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {user.name}
      </th>
      <td className="px-6 py-4">{user.kills}</td>
      <td className="px-6 py-4">{user.deaths}</td>
      <td className="px-6 py-4">{user.wins}</td>
    </tr>
  ));

  return (
    <>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Kills
              </th>
              <th scope="col" className="px-6 py-3">
                Deaths
              </th>
              <th scope="col" className="px-6 py-3">
                Wins
              </th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    </>
  );
}
