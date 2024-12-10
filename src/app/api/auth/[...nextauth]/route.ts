import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt", // Use JWT for session management
    maxAge: 30 * 60, // 30 minutes
    updateAge: 5 * 60, // Update session every 5 minutes
  },
  pages: {
    signIn: "/pages/signin", // Custom sign-in page
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }

        // Call your backend API to verify user credentials
        const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/public/users/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });

        const user = await res.json();

        if (!res.ok || !user) {
          throw new Error(user?.message || "Invalid credentials.");
        }

        // Ensure that user object contains necessary fields
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    // Add custom fields to the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role; // Include role in the token
      }
      return token;
    },
    // Expose additional fields to the session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role; // Include role in the session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Use your secret for JWT signing
});

export { handler as GET, handler as POST };
