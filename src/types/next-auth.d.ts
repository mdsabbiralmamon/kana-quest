import { DefaultSession, DefaultUser } from "next-auth";

// Extend the default User type
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    role: string; // Add role property
    photo?: string; // Add photo property (optional)
  }

  interface Session {
    user: {
      id: string;
      role: string; // Add role property
      photo?: string; // Add photo property (optional)
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string; // Add role property
    photo?: string; // Add photo property (optional)
  }
}
