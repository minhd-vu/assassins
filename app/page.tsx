import Hero from "@/components/Hero";
import Party from "@/components/Party";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="min-h-screen bg-base-200">
      <div>{session ? <Party /> : <Hero />}</div>
    </div>
  );
}
