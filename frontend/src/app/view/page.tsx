import CourseTimeTable from "@/components/CourseTimeTable/CourseTimeTable";
import { getCourses } from "@/utils/getCourses";

/**
 * `/view` ページ — 授業一覧時間割。
 *
 * Server Component としてコース一覧を取得し、
 * `CourseTimeTable` に渡して描画する。
 */
export default async function ViewPage() {
  const courses = await getCourses();
  return (
    <main className="h-[calc(100vh-48px)]">
      <CourseTimeTable courses={courses} />
    </main>
  );
}
