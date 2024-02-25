"use client";

import { useSWRConfig } from "swr";

export default function PromotePlayer({ playerId }: { playerId: string }) {
  const { mutate } = useSWRConfig();

  async function promotePlayer() {
    const res = await fetch("/api/user", {
      // method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerId }),
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }

    mutate("/api/user");
  }

  return (
    <button
      className="btn btn-square btn-xs btn-warning"
      onClick={() => promotePlayer}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        transform="translate(0,-1)"
      >
        <path />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18 13l-6-6-6 6M18 19l-6-6-6 6"
        />
      </svg>
    </button>
  );
}
