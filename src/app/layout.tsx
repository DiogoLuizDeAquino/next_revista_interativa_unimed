import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Revista Corporativa Unimed",
  description: "Homenagem à gestão",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="h-full">
      <body className="h-full antialiased">{children}</body>
    </html>
  );
}