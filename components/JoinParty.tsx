"use client";

import { FormEvent } from "react";

export default function JoinParty() {
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const res = await fetch("/api/party/join", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ code: data.get("code") }),
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="code">Party Code:</label>
      <input
        type="text"
        id="code"
        name="code"
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        required
      />
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Join Party
      </button>
    </form>
  );
}
