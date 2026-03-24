import type { Metadata } from "next";
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { ThemeProvider } from '@/components/ThemeProvider';
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
    <html lang="en" data-theme="light">
      <body>
        <ThemeProvider>
          {children}
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
