"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * グローバルエラーバウンダリ — ルートレイアウトを含む最上位のエラーを捕捉する。
 * html/body タグを含める必要がある。
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="antialiased">
        <main className="flex flex-col items-center justify-center min-h-screen gap-6 p-8 text-center">
          <h1 className="text-2xl font-semibold">重大なエラーが発生しました</h1>
          <p className="text-sm text-muted-foreground max-w-md">
            アプリケーションで予期しない問題が発生しました。再試行するか、ページを再読み込みしてください。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={reset}
              className="px-6 py-3 bg-primary text-primary-foreground rounded font-medium hover:opacity-80 transition-opacity"
            >
              再試行
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded font-medium hover:opacity-80 transition-opacity"
            >
              ホームへ戻る
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
