import { type Course } from "@/types/course";

/**
 * シラバスAPIからコース一覧を取得する。
 *
 * Next.js Server Component / Route Handler から呼び出すことを想定しており、
 * `fetch` の `cache` オプションによりレスポンスをキャッシュする。
 */
export async function getCourses(): Promise<Course[]> {
  const apiEndpoint =
    process.env.API_ENDPOINT ?? "http://syllabus-backend:8080";
  try {
    const res = await fetch(`${apiEndpoint}/courses`, {
      cache: "force-cache",
    });
    if (!res.ok) {
      console.error(`getCourses: HTTP error ${res.status}`);
      return [];
    }
    return (await res.json()).courses as Course[];
  } catch (err) {
    console.error("getCourses: fetch failed", err);
    return [];
  }
}
