import { getServerSession } from "next-auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const session = await getServerSession();
  if (!session || !session.user) {
    return Response.json(null, { status: 401 });
  }

  return Response.json(null);
}
