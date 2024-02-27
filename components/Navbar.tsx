import { getServerSession } from "next-auth";
import LoginButton from "./LoginButton";
import ThemeController from "./ThemeController";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

export default async function Navbar() {
  const session = await getServerSession();
  let user: User | null = null;
  if (session?.user?.email) {
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          Assassins
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-2">
          {user && (
            <li>
              <a href={`/user/${user.name}`}>Profile</a>
            </li>
          )}
          <li>
            <a href="/leaderboard">Leaderboard</a>
          </li>
          <li>
            <LoginButton />
          </li>
        </ul>
        <ThemeController />
      </div>
    </div>
  );
}
