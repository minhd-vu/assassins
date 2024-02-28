"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { PartyJoinBody } from "@/lib/party";
import { toSentence } from "./Alert";

export default function JoinParty() {
  const { mutate } = useSWRConfig();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<PartyJoinBody>();

  const onSubmit: SubmitHandler<PartyJoinBody> = async ({ code }) => {
    const res = await fetch("/api/party/join", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ code: code?.toLowerCase() }),
    });

    if (!res.ok) {
      setError("code", { message: await res.json() });
      return;
    }

    mutate("/api/user");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-x-2 flex flex-row">
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 opacity-70"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 5h2" />
                <path d="M5 4v2" />
                <path d="M11.5 4l-.5 2" />
                <path d="M18 5h2" />
                <path d="M19 4v2" />
                <path d="M15 9l-1 1" />
                <path d="M18 13l2 -.5" />
                <path d="M18 19h2" />
                <path d="M19 18v2" />
                <path d="M14 16.518l-6.518 -6.518l-4.39 9.58a1 1 0 0 0 1.329 1.329l9.579 -4.39z" />
              </svg>
              <input
                {...field}
                onChange={(e) => field.onChange(e.target.value.toUpperCase())}
                className="grow"
                placeholder="Party Code"
                required
              />
            </label>
          )}
        />
        <button className="btn btn-primary">Join Party</button>
      </div>
      <p className="text-sm text-error mt-1">
        {toSentence(errors.code?.message)}
      </p>
    </form>
  );
}
