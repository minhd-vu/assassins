"use client";

import { Button } from "./Button";

export default function KickPlayer({ playerId }: { playerId: string }) {
  return (
    <Button
      route="/api/party/kick"
      className="btn-square btn-xs btn-error"
      spinnerSize="xs"
      body={JSON.stringify({ playerId })}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </Button>
  );
}
