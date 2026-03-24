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
                  if (theme !== 'light' && theme !== 'dark') {
                    var mql = window.matchMedia('(prefers-color-scheme: dark)');
                    theme = mql.matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  // If anything goes wrong, default to light without blocking render.
                  document.documentElement.setAttribute('data-theme', 'light');
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
