import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "rishu-app",
  description: "金沢大学抽選対象科目履修登録支援WEBアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body style={{ height: "100dvh" }}>{children}</body>
      <GoogleTagManager gtmId="GTM-M47VN8WW" />
    </html>
  );
}
