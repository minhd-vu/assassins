"use client";

import { useSWRConfig } from "swr";

export default function CreateParty() {
  const { mutate } = useSWRConfig();

  async function onClick() {
    const res = await fetch("/api/party", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }

    mutate("/api/user");
  }

  return (
    <button className="btn btn-primary" onClick={() => onClick()}>
      Create Party
    </button>
  );
}
