"use client";

import { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { ErrorContext } from "./App";

type Inputs = {
  code: string;
};

export default function JoinParty() {
  const { mutate } = useSWRConfig();
  const { register, handleSubmit } = useForm<Inputs>();
  const { setError } = useContext(ErrorContext);

  const onSubmit: SubmitHandler<Inputs> = async ({ code }) => {
    const res = await fetch("/api/party/join", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!res.ok) {
      setError(await res.json());
      return;
    }

    mutate("/api/user");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("code")}
        className="input input-bordered"
        placeholder="Party Code"
        required
      />
      <button className="btn btn-primary">Join Party</button>
    </form>
  );
}
