import { DefaultSession } from "next-auth";

// Extending the default NextAuth session object
declare module "next-auth" {
  interface User {
    userType: "VIEWER" | "EDITOR"; // Add userType to the User object
  }

  interface Session {
    user: {
      id: string;
      userType: "VIEWER" | "EDITOR"; // Replace with your own user types
    } & DefaultSession["user"]; // Keep the default user properties (email, name, etc.)
  }
}

// Extending the JWT type to include userType
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userType: "VIEWER" | "EDITOR"; // Replace with your own user types
  }
}
