"use client";

import { FormEvent } from "react";
import { useSWRConfig } from "swr";

export default function JoinParty() {
  const { mutate } = useSWRConfig();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const value = data.get("code");
    if (!value) {
      throw new Error();
    }

    const code = value.toString().toLowerCase();
    const res = await fetch("/api/party/join", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }

    mutate("/api/user");
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        id="code"
        name="code"
        className="input input-bordered"
        placeholder="Party Code"
        required
      />
      <button className="btn btn-primary">Join Party</button>
    </form>
  );
}
