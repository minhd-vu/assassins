"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { UserBody } from "@/lib/user";

export default function NameForm() {
  const { mutate } = useSWRConfig();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<UserBody>();

  const onSubmit: SubmitHandler<UserBody> = async ({ name }) => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      setError("name", { message: await res.json() });
      return;
    }

    mutate("/api/user");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-3xl">Set Username</h1>
      <p className="text-center">Please choose a username.</p>
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
      <p>{errors.name?.message}</p>
      <button className="btn btn-primary">Save</button>
    </form>
  );
}
