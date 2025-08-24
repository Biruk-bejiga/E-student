import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Student Portal",
  description: "College student management portal",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session;

  return (
    <html lang="en">
      <body className={inter.className}>
        {isLoggedIn ? (
          <div className="flex">
            <Navigation />
            <main className="flex-1 bg-gray-100 min-h-screen">
              {children}
            </main>
          </div>
        ) : (
          <>{children}</>
        )}
      </body>
    </html>
  );
}