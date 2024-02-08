import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const options = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
