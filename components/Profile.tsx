"use client";

import { useContext } from "react";
import { UserContext } from "./UserProvider";
import Link from "next/link";

export default function Profile() {
  const { user } = useContext(UserContext);

  if (!user?.name) {
    return null;
  }

  return (
    <li>
      <Link href={`/user/${user.name}`}>Profile</Link>
    </li>
  );
}
