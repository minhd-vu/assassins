"use client";

import { useContext } from "react";
import { useSWRConfig } from "swr";
import { ErrorContext } from "./App";

export default function KickPlayer({ playerId }: { playerId: string }) {
  const { setError } = useContext(ErrorContext);
  const { mutate } = useSWRConfig();

  async function onClick() {
    const res = await fetch("/api/party/kick", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerId }),
    });

    if (!res.ok) {
      setError(await res.json());
      return;
    }

    mutate("/api/user");
  }

  return (
    <button
      className="btn btn-square btn-xs btn-error"
      onClick={() => onClick()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
