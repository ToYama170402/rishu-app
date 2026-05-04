import { fetchCourses } from "@/lib/api/courses";
import CourseTimeTable from "@/components/CourseTimeTable/CourseTimeTable";
import AppBar from "@/features/AppBar/AppBar";

/**
 * `/view` ページ — 授業一覧時間割。
 *
 * Server Component としてコース一覧を取得し、
 * `CourseTimeTable` に渡して描画する。
 */
export default async function ViewPage() {
  const courses = await fetchCourses();
  return (
    <>
      <AppBar />
      <main className="h-[calc(100vh-48px)]">
        <CourseTimeTable courses={courses} />
      </main>
    </>
  );
}
