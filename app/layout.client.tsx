// app/layout.client.tsx - Client Component

"use client"; // Ensure this is a client-side component

import { SessionProvider } from "next-auth/react"; // Import SessionProvider from next-auth
import { AuthProvider } from "../app/contexts/authcontext"; // Your custom AuthProvider
import { useSession } from "next-auth/react"; // Import useSession if needed
import { useEffect } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </SessionProvider>
  );
}
