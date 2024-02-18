"use client";

import { useRouter } from "next/navigation";

export default function RemovePlayer({ playerId }: { playerId: string }) {
  const router = useRouter();

  async function removePlayer(playerId: string) {
    const res = await fetch("/api/party/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ playerId }),
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }

    router.refresh();
  }

  return (
    <button
      type="button"
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      onClick={() => removePlayer(playerId)}
    >
      Remove
    </button>
  );
}
