import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export default function JoinParty() {
  async function joinParty(form: FormData) {
    "use server";

    const session = await getServerSession();
    if (!session?.user?.email) {
      return Response.json(null, { status: 401 });
    }

    const code = form.get("code")?.toString().toLowerCase();

    let party = await prisma.party.findUnique({
      where: {
        code,
      },
    });

    if (!party) {
      return Response.json(`Failed to find party with code ${code}`, {
        status: 400,
      });
    }

    if (party.started) {
      return Response.json(`Cannot join party that has already started`, {
        status: 403,
      });
    }

    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        partyId: party.id,
      },
    });

    party = await prisma.party.findUnique({
      where: {
        code,
      },
      include: {
        players: true,
      },
    });

    revalidatePath("/");
  }

  return (
    <form action={joinParty}>
      <label htmlFor="code">Party Code:</label>
      <input
        type="text"
        id="code"
        name="code"
        className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
        required
      />
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Join Party
      </button>
    </form>
  );
}
