import { getServerSession } from "next-auth/next";
import { options } from "./auth/[...nextauth]/route";

export default async (req: any, res: any) => {
  const session = await getServerSession(req, res, options);
  if (session) {
    res.send({
      content:
        "This is protected content. You can access this content because you are signed in.",
    });
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};
