import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "rishu-app",
  description: "金沢大学抽選対象GS科目履修登録支援WEBアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
