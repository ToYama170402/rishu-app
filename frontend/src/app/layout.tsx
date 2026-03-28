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
  title: "rishu-app",
  description: "金沢大学の学生向け履修支援ツール",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="h-12 border-b flex items-center px-4 gap-4 bg-background">
          <span className="font-semibold text-sm">rishu-app</span>
          <nav className="flex gap-3 text-sm">
            <Link
              href="/view"
              className="hover:underline text-muted-foreground hover:text-foreground transition-colors"
            >
              時間割一覧
            </Link>
            <Link
              href="/builder"
              className="hover:underline text-muted-foreground hover:text-foreground transition-colors"
            >
              履修登録ビルダー
            </Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
