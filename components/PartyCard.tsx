"use client";

import { useState } from "react";

export default function PartyCard({
  children,
  code,
}: {
  children: React.ReactNode;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  function onClick() {
    setCopied(true);
    navigator.clipboard.writeText(code.toUpperCase());
  }

  return (
    <div className="card w-96 bg-base-200 shadow-xl">
      <div className="card-body">
        <div className="flex flex-row items-start">
          <h1 className="card-title text-3xl">Code: {code.toUpperCase()}</h1>
          <button className="btn btn-square btn-xs" onClick={() => onClick()}>
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
                <path d="M11 14l2 2l4 -4" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z" />
                <path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1" />
              </svg>
            )}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
