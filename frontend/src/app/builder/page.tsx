import { getCourses } from "@/utils/getCourses";
import BuilderClient from "./BuilderClient";

/**
 * `/builder` ページ — 履修登録ビルダー。
 *
 * Server Component としてコース一覧を取得し、
 * クライアント側のインタラクション（選択・フィルタ）を
 * `BuilderClient` に委譲する。
 */
export default async function BuilderPage() {
  const courses = await getCourses();
  return (
    <main className="h-[calc(100vh-48px)]">
      <BuilderClient courses={courses} />
    </main>
  );
}
