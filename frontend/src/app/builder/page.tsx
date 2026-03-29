import { fetchCourses } from "@/lib/api/courses";
import BuilderClient from "./BuilderClient";
import AppBar from "@/features/AppBar/AppBar";

/**
 * `/builder` ページ — 履修登録ビルダー。
 *
 * Server Component としてコース一覧を取得し、
 * クライアント側のインタラクション（選択・フィルタ）を
 * `BuilderClient` に委譲する。
 */
export default async function BuilderPage() {
  const courses = await fetchCourses();
  return (
    <>
      <AppBar />
      <main className="h-[calc(100vh-48px)]">
        <BuilderClient courses={courses} />
      </main>
    </>
  );
}
