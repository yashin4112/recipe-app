import type { Metadata } from "next";
import { getAllEntries, getHeaderRes } from "@/helper"; // Helper function to fetch header data
import Header from "@/components/header";
export const metadata: Metadata = {
  title: "My App",
  description: "A simple Next.js application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>
        {/* <Header headerData={headerData} /> Pass data to Header */}
        {children}
      </body>
    </html>
  );
}
