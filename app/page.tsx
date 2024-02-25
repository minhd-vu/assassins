import Hero from "@/components/Hero";
import Party from "@/components/Party";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();

  return (
    <div className="bg-base-200 flex flex-grow justify-center pt-20">
      <div>{session ? <Party /> : <Hero />}</div>
    </div>
  );
}
