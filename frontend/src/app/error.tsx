"use client";

import { useEffect } from "react";
import Link from "next/link";
import AppBar from "@/features/AppBar/AppBar";

/**
 * エラーバウンダリ — ルート配下のページでエラーが発生した場合に表示される。
 */
export default function Error({
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
    <>
      <AppBar />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-48px)] gap-6 p-8 text-center">
        <h1 className="text-2xl font-semibold">エラーが発生しました</h1>
        <p className="text-muted-foreground max-w-md">
          予期しないエラーが発生しました。再試行するか、ホームへ戻ってください。
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
    </>
  );
}
