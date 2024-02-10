import prisma from "@/lib/prisma";
import { User } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: any }) {
      try {
        let player = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

        if (!player) {
          const data = {
            email: user.email,
            name: user.name,
          } as User;

          await prisma.user.create({ data });
        }
      } catch (err) {
        console.log("Error creating user", err);
        return false;
      }

      return true;
    },
    async session({ session }: { session: any }) {
      if (session.user?.email) {
        const user = await prisma.user.findUnique({
          where: {
            email: session.user.email,
          },
        });
        session.user = user;
      }

      return session;
    },
  },
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
