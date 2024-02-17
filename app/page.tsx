import LoginButton from "@/components/LoginButton";
import Navbar from "@/components/Navbar";
import Party from "@/components/Party";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <>
      <Navbar />
      {session ? <Party /> : <LoginButton />}
    </>
  );
}
