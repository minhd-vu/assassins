import App from "@/components/App";
import Hero from "@/components/Hero";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="flex flex-grow justify-center">
      {session ? <App /> : <Hero />}
    </div>
  );
}
