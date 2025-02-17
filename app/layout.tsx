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

