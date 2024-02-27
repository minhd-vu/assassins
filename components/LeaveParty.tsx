"use client";

import { useState } from "react";
import { useSWRConfig } from "swr";

export default function LeaveParty() {
  const [isLoading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();

  async function onClick() {
    setLoading(true);

    const res = await fetch("/api/party/leave", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }

    mutate("/api/user");
  }

  return (
    <button className="btn btn-error" onClick={() => onClick()}>
      Leave Party
      {isLoading && <span className="loading loading-dots loading-sm"></span>}
    </button>
  );
}
