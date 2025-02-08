// app/_app.tsx

import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "./contexts/authcontext"; // Import AuthProvider
import type { AppProps } from "next/app";  // Import AppProps type

// Use the proper typing for the App component
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </SessionProvider>
  );
}
