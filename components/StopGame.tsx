"use client";

import { useSWRConfig } from "swr";

export default function StopGame() {
  const { mutate } = useSWRConfig();

  async function stopGame() {
    const res = await fetch("/api/party/stop", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }

    mutate("/api/user");
  }

  return (
    <button className="btn btn-warning" onClick={() => stopGame()}>
      Stop Game
    </button>
  );
}
