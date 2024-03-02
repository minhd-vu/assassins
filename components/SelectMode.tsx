"use client";

import { Mode } from "@prisma/client";
import { useContext } from "react";
import { ErrorContext } from "./App";
import { useSWRConfig } from "swr";
import ModeInfo from "./ModeInfo";

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
    <div className="inline-flex items-center">
      <ModeInfo />
      <label htmlFor="mode-select" className="ml-1 mr-2">
        Mode:
      </label>
      <select
        id="mode-select"
        onChange={(e) => onChange(e)}
        className="select select-bordered select-sm w-full"
      >
        {modes.map((m) => (
          <option key={m}>{m}</option>
        ))}
      </select>
    </div>
  );
}
