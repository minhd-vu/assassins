"use client";

import { useContext } from "react";
import { ErrorContext } from "./App";
import { useSWRConfig } from "swr";

export default function StartGame() {
  const { setError } = useContext(ErrorContext);
  const { mutate } = useSWRConfig();

  async function startGame() {
    const res = await fetch("/api/party/start", {
      method: "POST",
    });

    if (!res.ok) {
      setError(await res.json());
      return;
    }

    mutate("/api/user");
  }

  return (
    <button className="btn btn-success" onClick={() => startGame()}>
      Start Game
    </button>
  );
}
