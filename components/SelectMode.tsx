"use client";

import { Mode } from "@prisma/client";
import { useContext } from "react";
import { ErrorContext } from "./App";
import { useSWRConfig } from "swr";

export default function SelectMode({ mode }: { mode: Mode }) {
  const modes = Object.values(Mode);
  const { setError } = useContext(ErrorContext);
  const { mutate } = useSWRConfig();

  async function onChange(e: any) {
    if (mode === e.target.value) {
      return;
    }

    const res = await fetch("/api/party", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ mode: e.target.value }),
    });

    if (!res.ok) {
      setError(await res.json());
      return;
    }

    mutate("/api/user");
  }

  return (
    <div className="inline-flex items-baseline space-x-2">
      <span>Mode:</span>
      <select
        onChange={(e) => onChange(e)}
        className="select select-bordered select-sm w-full"
      >
        {modes.map((m) => (
          <option>{m}</option>
        ))}
      </select>
    </div>
  );
}
