"use client";

import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { ErrorContext } from "./App";

type Inputs = {
  code: string;
};

export default function JoinParty() {
  const { mutate } = useSWRConfig();
  const { handleSubmit, control } = useForm<Inputs>();
  const { setError } = useContext(ErrorContext);

  const onSubmit: SubmitHandler<Inputs> = async ({ code }) => {
    const res = await fetch("/api/party/join", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ code: code.toLowerCase() }),
    });

    if (!res.ok) {
      setError(await res.json());
      return;
    }

    mutate("/api/user");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
    </form>
  );
}
