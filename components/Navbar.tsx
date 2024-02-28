import { getServerSession } from "next-auth";
import LoginButton from "./LoginButton";
import ThemeController from "./ThemeController";
import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import Link from "next/link";

export default async function Navbar() {
  const session = await getServerSession();
  let user: User | null = null;
  if (session?.user?.email) {
    user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
  }

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/">
          Assassins
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-2">
          {user && (
            <li>
              <Link href={`/user/${user.name}`}>Profile</Link>
            </li>
          )}
          <li>
            <Link href="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link href="/help">Help</Link>
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
