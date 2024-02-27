import prisma from "@/lib/prisma";

export default async function UserById({
  params,
}: {
  params: { name: string };
}) {
  const name = params.name;
  const user = await prisma.user.findUnique({ where: { name } });

  if (!user) {
    return <p>No user found with name {name}</p>;
  }

  return (
    <>
      <h1 className="text-5xl font-bold text-center mt-4">{user.name}</h1>
      <p className="text-sm font-light italic text-center">{user.id}</p>
      <div className="stats shadow bg-base-300 m-4">
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block w-8 h-8 stroke-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6.5 7h11" />
              <path d="M6.5 17h11" />
              <path d="M6 20v-2a6 6 0 1 1 12 0v2a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1z" />
              <path d="M6 4v2a6 6 0 1 0 12 0v-2a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1z" />
            </svg>
          </div>
          <div className="stat-title">Date Joined</div>
          <div className="stat-value">
            {user.createdAt.toLocaleDateString()}
          </div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block w-8 h-8 stroke-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 21l8 0" />
              <path d="M12 17l0 4" />
              <path d="M7 4l10 0" />
              <path d="M17 4v8a5 5 0 0 1 -10 0v-8" />
              <path d="M5 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M19 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
            </svg>
          </div>
          <div className="stat-title">Wins</div>
          <div className="stat-value">{user.wins}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block w-8 h-8 stroke-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M21 3v5l-11 9l-4 4l-3 -3l4 -4l9 -11z" />
              <path d="M5 13l6 6" />
              <path d="M14.32 17.32l3.68 3.68l3 -3l-3.365 -3.365" />
              <path d="M10 5.5l-2 -2.5h-5v5l3 2.5" />
            </svg>
          </div>
          <div className="stat-title">Kills</div>
          <div className="stat-value">{user.kills}</div>
        </div>
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block w-8 h-8 stroke-current"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
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
          <div className="stat-title">Deaths</div>
          <div className="stat-value">{user.deaths}</div>
        </div>
      </div>
    </>
  );
}
