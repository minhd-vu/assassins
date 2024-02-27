import prisma from "@/lib/prisma";
import NextAuth, { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
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
    async signIn({ user }: { user: User | AdapterUser }) {
      if (!user.email) {
        return false;
      }

      try {
        let player = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });

        if (!player) {
          await prisma.user.create({
            data: {
              email: user.email,
            },
          });
        }
      } catch (err) {
        console.log("Error creating user", err);
        return false;
      }

      return true;
    },
  },
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
