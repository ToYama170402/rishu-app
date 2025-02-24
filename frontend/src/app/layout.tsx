import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "rishu-app | 金沢大学履修登録支援ツール",
  description:
    "rishu-appは金沢大学生の履修登録を支援するツールです。抽選科目の応募状況を視覚的に確認したり、講義を探索することができます。",
  authors: [{ name: "ToYama", url: "https://toyama170402.github.io/" }],
  applicationName: "rishu-app",
  formatDetection: { telephone: false, address: false, email: false },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body style={{ height: "100dvh" }}>{children}</body>
      <GoogleTagManager gtmId={process.env.GTM!} />
    </html>
  );
}
