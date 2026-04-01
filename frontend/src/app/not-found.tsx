import Link from "next/link";
import AppBar from "@/features/AppBar/AppBar";

/**
 * 404 ページ — 存在しないルートにアクセスした場合に表示される。
 */
export default function NotFound() {
  return (
    <>
      <AppBar />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-48px)] gap-6 p-8 text-center">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">ページが見つかりません</h2>
        <p className="text-muted-foreground max-w-md">
          お探しのページは存在しないか、移動または削除された可能性があります。
        </p>
        <Link
          href="/"
          className="px-6 py-3 bg-primary text-primary-foreground rounded font-medium hover:opacity-80 transition-opacity"
        >
          ホームへ戻る
        </Link>
      </main>
    </>
  );
}
