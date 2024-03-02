import SessionProvider from "@/components/SessionProvider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UserProvider from "@/components/UserProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Assassins",
  description: "Assassins Live Action Game",
  verification: {
    google: "tuzr6XtiN8FWYcTN54Uj0ZBeWEbU1F5_c8F3A3uDdfo",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider>
            <UserProvider>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                {children}
                <Footer />
              </div>
            </UserProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
