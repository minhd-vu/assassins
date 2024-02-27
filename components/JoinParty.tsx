"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { PartyJoinBody } from "@/lib/party";

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
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="space-x-2">
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              onChange={(e) => field.onChange(e.target.value.toUpperCase())}
              className="input input-bordered"
              placeholder="Party Code"
              required
            />
          )}
        />
        <button className="btn btn-primary">Join Party</button>
      </div>
      <p className="text-sm text-error mt-1">{errors.code?.message}</p>
    </form>
  );
}
