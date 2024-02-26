"use client";

import { useContext } from "react";
import { useSWRConfig } from "swr";
import { ErrorContext } from "./App";

export default function ConfirmKill() {
  const { mutate } = useSWRConfig();
  const { setError } = useContext(ErrorContext);

  async function onClick() {
    const res = await fetch("/api/kill/confirm", {
      method: "POST",
    });

    if (!res.ok) {
      setError(await res.json());
      return;
    }

    mutate("/api/user");
  }

  return (
    <button className="btn btn-success" onClick={() => onClick()}>
      Confirm Kill
    </button>
  );
}
