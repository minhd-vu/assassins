import { getUser } from "@/lib/user";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return Response.json(null, { status: 401 });
  }

  const user = await getUser(session.user.email);
  return Response.json(user);
}
