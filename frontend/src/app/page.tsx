import Link from "next/link";
import AppBar from "@/features/AppBar/AppBar";

/**
 * ルートページ — 各機能へのナビゲーション。
 */
export default function Home() {
  return (
    <>
      <AppBar />
      <main className="flex flex-col items-center justify-center min-h-[calc(100vh-48px)] gap-8 p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">rishu-app</h1>
          <p className="text-muted-foreground">金沢大学の学生向け履修支援ツール</p>
        </div>
        <nav className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/odds"
            className="px-6 py-3 bg-primary text-primary-foreground rounded text-center font-medium hover:opacity-80 transition-opacity"
          >
            抽選科目一覧
          </Link>
          <Link
            href="/view"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded text-center font-medium hover:opacity-80 transition-opacity"
          >
            授業一覧
          </Link>
          <Link
            href="/builder"
            className="px-6 py-3 bg-secondary text-secondary-foreground rounded text-center font-medium hover:opacity-80 transition-opacity"
          >
            履修登録ビルダー
          </Link>
        </nav>
      </main>
    </>
  );
}
