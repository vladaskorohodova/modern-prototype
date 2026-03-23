import type { Metadata } from "next";
import ScrollToTopButton from '@/components/ScrollToTopButton';
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
        <ScrollToTopButton />
      </body>
    </html>
  );
}
