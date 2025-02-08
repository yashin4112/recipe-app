// import { AuthProvider } from "../app/contexts/authcontext"; // Import AuthProvider
// import type { Metadata } from "next"; // Import Metadata if needed
// import { getAllEntries, getHeaderRes } from "@/helper"; // Import helper functions if needed
// import Header from "@/components/header"; // Import Header if needed

// export const metadata: Metadata = {
//   title: "My App",
//   description: "A simple Next.js application",
// };

// export default async function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <AuthProvider>
//           {/* Optionally, include a Header component here */}
//           {/* <Header /> */}
//           {children}
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }


// app/layout.tsx - Server Component

import ClientLayout from './layout.client'; // Import ClientLayout

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the content with ClientLayout */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}

