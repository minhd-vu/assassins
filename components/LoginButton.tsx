"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useContext } from "react";
import { UserContext } from "./UserProvider";

export default function LoginButton({ className }: { className?: string }) {
  const { data: session } = useSession();
  const { user } = useContext(UserContext);

  if (session || user) {
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
