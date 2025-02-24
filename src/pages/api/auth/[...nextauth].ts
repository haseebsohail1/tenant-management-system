import NextAuth, { DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      role: string;
      fullname?: string | null;
      email?: string | null;
      token?: string | null;
      loginTime?: string; // Add loginTime to the session
    } & DefaultUser;
    token: string;
    loginTime?: string; // Optional at the session level
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
        // Call your backend for authentication and token generation
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

        // If authentication fails
        if (!res.ok || !user?.result) {
          throw new Error(user?.message || "Invalid credentials");
        }

        
        // Return a user object with fields needed for the JWT
        return {
          email: user.result.email,
          id: user.result._id,
          fullname: user.result.fullname, // Add fullname here
          role: user.result.role,
          token: user.result.token,
          loginTime: new Date().toISOString(), // Example of additional data
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
        token.fullname = user.fullname; // Store fullname in the token
        token.token = user.token;
        token.loginTime = user.loginTime; // Store login time in token
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
          fullname: token.fullname, // Add fullname to session
        };
        session.token = token.token;
        session.loginTime = token.loginTime; // Include login time
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
