import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modern React Library",
  description: "Documentation for the Modern React Library component library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
