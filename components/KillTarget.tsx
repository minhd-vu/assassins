"use client";

import { useRouter } from "next/navigation";

export default function KillTarget() {
  const router = useRouter();

  async function killTarget() {
    const res = await fetch("/api/kill", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }

    console.log(await res.json());

    router.refresh();
  }

  return (
    <button className="btn btn-warning" onClick={() => killTarget()}>
      Kill Target
    </button>
  );
}
