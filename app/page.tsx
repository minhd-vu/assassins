import LoginButton from "@/components/LoginButton";
import Party from "@/components/Party";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return session ? <Party /> : <LoginButton />;
}
