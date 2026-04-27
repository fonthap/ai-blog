import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Blog",
  description: "AI news summaries and concepts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b border-foreground/10">
          <nav className="mx-auto max-w-3xl px-6 py-4">
            <Link href="/" className="text-xl font-bold">
              AI Blog
            </Link>
          </nav>
        </header>
        <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-8">
          {children}
        </main>
        <footer className="border-t border-foreground/10">
          <div className="mx-auto max-w-3xl px-6 py-4 text-sm text-foreground/60">
            © 2026 AI Blog
          </div>
        </footer>
      </body>
    </html>
  );
}
