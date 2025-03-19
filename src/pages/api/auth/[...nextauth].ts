import NextAuth, { DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      name?: string | null;
      email?: string | null;
      phone?: string | null;
      token?: string | null;
      loginTime?: string;
    } & DefaultUser;
    token: string;
    loginTime?: string;
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEXT_URL}/api/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          }
        );

        const user = await res.json();

        if (!res.ok || !user?.result) {
          throw new Error(user?.message || "Invalid credentials");
        }

        return {
          email: user.result.email,
          id: user.result._id,
          name: user.result.user.name,
          phone: user.result.user.phone,
          role: user.result.role,
          token: user.result.token,
          loginTime: new Date().toISOString(),
        };
      },
    }),
  ],
  callbacks: {
    /**
     * Attach additional fields to the token (JWT)
     */
    async jwt({ token, user }: any) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        token.role = user.role;
        token.name = user.name; // Store fullname in the token
        token.phone = user.phone;
        token.token = user.token;
        token.loginTime = user.loginTime;
      }
      return token;
    },
    /**
     * Make token fields available in the session object
     */
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          email: token.email,
          id: token.id,
          role: token.role,
          name: token.name,
          phone: token.phone,
        };
        session.token = token.token;
        session.loginTime = token.loginTime;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/signin?error=true",
  },
  secret: "acha",
});
