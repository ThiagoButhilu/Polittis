import { DefaultSession } from "next-auth";

// Extendendo os tipos do NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    email: string;
    password?: string; // opcional, porque não vai para o client
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    email: string;
  }
}
