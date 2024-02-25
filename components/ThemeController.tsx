"use client";

import { useTheme } from "next-themes";

export default function ThemeController() {
  const { theme, setTheme } = useTheme();

  const themes = ["light", "dark", "dracula", "synthwave", "retro"];

  function onClick(e: any) {
    setTheme(e.target.value);
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        Theme
        <svg
          width="12px"
          height="12px"
          className="h-2 w-2 fill-current opacity-60 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2048 2048"
        >
          <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
        </svg>
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box w-52"
      >
        {themes.map((e) => (
          <li key={e}>
            <input
              type="radio"
              className="btn btn-sm btn-block btn-ghost justify-start"
              aria-label={e[0].toUpperCase() + e.slice(1)}
              value={e}
              onClick={onClick}
              checked={theme === e}
              readOnly={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
