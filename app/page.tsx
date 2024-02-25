import App from "@/components/App";
import Hero from "@/components/Hero";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="bg-base-200 flex flex-grow justify-center pt-20">
      <div>{session ? <App /> : <Hero />}</div>
    </div>
  );
}
