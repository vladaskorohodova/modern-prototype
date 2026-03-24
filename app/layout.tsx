import type { Metadata } from "next";
import ScrollToTopButton from '@/components/ScrollToTopButton';
import { THEME_STORAGE_KEY } from '@/components/theme';
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = window.localStorage.getItem('${THEME_STORAGE_KEY}');
                  // Only apply explicit stored themes; all fallback logic
                  // (including system preference and defaults) is owned by ThemeProvider.
                  if (theme === 'light' || theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch (e) {
                  // Swallow errors; ThemeProvider will resolve the theme after hydration.
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
