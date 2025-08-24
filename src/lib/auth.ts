import NextAuth, { type NextAuthOptions, type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend the User and Session types to include 'role'
declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (
          credentials?.email === "student@college.edu" &&
          credentials?.password === "password"
        ) {
          return {
            id: "1",
            email: "student@college.edu",
            name: "John Doe",
            role: "student"
          };
        }
        return null;
      }
    })
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  }
};

export default NextAuth(authOptions);