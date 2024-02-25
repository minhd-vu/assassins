"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton({ className }: { className?: string }) {
  const { data: session } = useSession();

  if (session) {
    return (
      <button className={className} onClick={() => signOut()}>
        Logout
      </button>
    );
  }

  return (
    <button className={className} onClick={() => signIn()}>
      Login
    </button>
  );
}
