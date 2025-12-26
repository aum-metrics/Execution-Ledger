import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import './globals.css';
import { Sidebar } from '@/components/Sidebar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Execution Ledger',
  description: 'A practical platform exploring how software is built, why it fails, and how teams recover.',
  icons: {
    icon: '/icon.png?v=4',
    shortcut: '/favicon.ico?v=4',
    apple: '/apple-touch-icon.png?v=4',
  },
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full flex bg-white text-black`}
      >
        <Sidebar />
        <main className="flex-1 overflow-y-auto h-full bg-white">
          <div className="max-w-4xl mx-auto p-8 lg:p-12">
            {children}
            <footer className="mt-20 pt-8 border-t border-zinc-100 text-center text-zinc-400 text-sm pb-8">
              <div className="mb-8 flex justify-center gap-6">
                <a href="https://www.linkedin.com/in/sambathknatarajan/" target="_blank" rel="noopener noreferrer" className="text-[#0077b5] hover:text-[#004182] font-bold transition-colors text-base">
                  Connect on LinkedIn
                </a>
              </div>
              <p className="mb-2">© 2025 Execution Ledger. Authored by Sambath Kumar Natarajan.</p>
              <p className="max-w-2xl mx-auto text-xs text-zinc-300">
                This platform is an educational resource for understanding software architecture and delivery.
                The scenarios and examples are based on common industry patterns and should be used as learning tools
                rather than specific recommendations for your organization.
              </p>
            </footer>
          </div>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
