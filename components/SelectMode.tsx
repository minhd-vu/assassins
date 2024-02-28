"use client";

import { Mode } from "@prisma/client";
import { useContext, useState } from "react";
import { ErrorContext } from "./App";
import { useSWRConfig } from "swr";

export default function SelectMode({ mode }: { mode: Mode }) {
  const modes = Object.values(Mode);
  const { setError } = useContext(ErrorContext);
  const { mutate } = useSWRConfig();
  const [isLoading, setLoading] = useState(
    Object.fromEntries(Object.values(Mode).map((m) => [m, false])),
  );

  async function onClick(e: Mode) {
    setLoading((prev) => ({ ...prev, [e]: true }));

    const res = await fetch("/api/party", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ mode: e }),
    });

    setLoading((prev) => ({ ...prev, [e]: false }));

    if (!res.ok) {
      setError(await res.json());
      return;
    }

    mutate("/api/user");
  }

  return (
    <div className="flex flex-row items-baseline space-x-1">
      <span>Mode:</span>
      <div className="dropdown dropdown-start">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
          {mode}
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
          className="dropdown-content z-[1] p-2 shadow-2xl bg-base-300 rounded-box my-1"
        >
          {modes.map((e) => (
            <li key={e}>
              <button
                className={`btn btn-sm btn-block ${mode === e ? "btn-primary" : "btn-ghost"}`}
                onClick={() => onClick(e)}
              >
                <span className={isLoading[e] ? "invisible" : "visible"}>
                  {e}
                </span>
                {isLoading[e] && (
                  <span className="loading loading-spinner loading-xs absolute text-center" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
