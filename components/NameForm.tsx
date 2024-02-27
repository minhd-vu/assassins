"use client";

import { useContext } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { ErrorContext } from "./App";
import { UserBody } from "@/lib/user";

export default function NameForm() {
  const { mutate } = useSWRConfig();
  const { handleSubmit, control } = useForm<UserBody>();
  const { setError } = useContext(ErrorContext);

  const onSubmit: SubmitHandler<UserBody> = async ({ name }) => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      setError(await res.json());
      return;
    }

    mutate("/api/user");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl">Set Username</h1>
      <p className="text-center">
        Please choose a username. You won&apos;t be able to change this in the
        future.
      </p>
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <input
            {...field}
            className="input input-bordered"
            placeholder="Username"
            required
          />
        )}
      />
      <button className="btn btn-primary">Save</button>
    </form>
  );
}
