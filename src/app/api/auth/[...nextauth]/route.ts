// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { apiGet } from "../../database";


console.log("SECRET", process.env.NEXTAUTH_SECRET);
console.log("URL", process.env.NEXTAUTH_URL);


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const query = `SELECT id, password FROM user WHERE email = ?`;
        const result: any = await apiGet(query, [credentials.email]);

        if (!result || result.length === 0) return null;

        const user = result[0];
        const isValid = await bcrypt.compare(credentials.password, user.password);

        if (!isValid) return null;

        // garante que user.id vai para o token
        return { id: user.id, email: credentials.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      // na primeira vez que o user loga, coloca o id no token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // faz o id aparecer em session.user
      if (session.user) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };