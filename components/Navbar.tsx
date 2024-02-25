import LoginButton from "./LoginButton";
import ThemeController from "./ThemeController";

export default async function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" href="/">
          Assassins
        </a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-2">
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
