"use client";

import { useContext } from "react";
import { useSWRConfig } from "swr";
import { ErrorContext } from "./App";

export default function StopGame() {
  const { setError } = useContext(ErrorContext);
  const { mutate } = useSWRConfig();

  async function onClick() {
    const res = await fetch("/api/party/stop", {
      method: "POST",
    });

    if (!res.ok) {
      setError(await res.json());
      return;
    }

    mutate("/api/user");
  }

  return (
    <button className="btn btn-warning" onClick={() => onClick()}>
      Stop Game
    </button>
  );
}
