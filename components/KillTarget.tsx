"use client";

import { useSWRConfig } from "swr";

export default function KillTarget() {
  const { mutate } = useSWRConfig();

  async function killTarget() {
    const res = await fetch("/api/kill", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }

    console.log(await res.json());

    mutate("/api/user");
  }

  return (
    <button className="btn btn-accent" onClick={() => killTarget()}>
      Kill Target
    </button>
  );
}
