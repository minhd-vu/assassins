"use client";
import { useSession } from "next-auth/react";

async function createParty() {
  const res = await fetch("/api/party", {
    method: "POST",
  });

  console.log(await res.json());
}

export default function CreatePartyButton() {
  return <button onClick={() => createParty()}>Create party</button>;
}
