import dbConnect from "@/lib/dbConnect";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/User";

const options = {
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
      await dbConnect();

      try {
        const oldUser = await User.findOne({ email: user.email });

        if (!oldUser) {
          const newUser = new User({
            email: user.email,
            name: user.name,
          });
          await newUser.save();
        }

        return true;
      } catch (err) {
        console.log("Error saving user", err);
        return false;
      }
    },
    async session({ session }: { session: any }) {
      await dbConnect();

      const user = await User.findOne({ email: session.user.email });
      session.user = user;

      return session;
    },
  },
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
