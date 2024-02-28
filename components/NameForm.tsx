"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import { UserBody } from "@/lib/user";
import { toSentence } from "./Alert";
import { useState } from "react";

export default function NameForm() {
  const [isLoading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<UserBody>();

  const onSubmit: SubmitHandler<UserBody> = async ({ name }) => {
    setLoading(true);

    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    if (!res.ok) {
      setError("name", { message: await res.json() });
      setLoading(false);
      return;
    }

    mutate("/api/user");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center space-y-2">
      <p className="text-xl">Choose Your Username</p>
      <div className="space-x-2 flex flex-row">
        <Controller
          name="name"
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
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              </svg>
              <input
                {...field}
                className="grow"
                placeholder="Username"
                required
              />
            </label>
          )}
        />
        <button className="btn btn-primary">
          <span className={isLoading ? "invisible" : "visible"}>Save</span>
          {isLoading && (
            <span className="loading loading-spinner loading-sm absolute" />
          )}
        </button>
      </div>
      <p className="text-sm text-error">{toSentence(errors.name?.message)}</p>
    </form>
  );
}
