import { removePlayer } from "@/lib/party";
import _ from "lodash";
import { getServerSession } from "next-auth";

export async function POST() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json(null, { status: 401 });
  }

  return removePlayer(session.user.email);
}
