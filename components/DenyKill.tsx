"use client";

import { useContext } from "react";
import { useSWRConfig } from "swr";
import { ErrorContext } from "./App";

export default function DenyKill() {
  const { mutate } = useSWRConfig();
  const { setError } = useContext(ErrorContext);

  async function onClick() {
    const res = await fetch("/api/kill/deny", {
      method: "POST",
    });

    if (!res.ok) {
      setError(await res.json());
      return;
    }

    mutate("/api/user");
  }

  return (
    <button className="btn btn-error" onClick={() => onClick()}>
      Deny Kill
    </button>
  );
}
