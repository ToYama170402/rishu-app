import type { Course } from "@/types/course";
import { SYLLABUS_API_URL, SYLLABUS_API_URL_PUBLIC } from "./endpoints";

function getSyllabusBaseUrl(): string {
  return typeof window === "undefined"
    ? SYLLABUS_API_URL
    : SYLLABUS_API_URL_PUBLIC;
}

/**
 * シラバス API から全講座情報を取得する。
 * SSR 時は `SYLLABUS_API_URL` 環境変数を、CSR 時は `NEXT_PUBLIC_SYLLABUS_API_URL` を使用する。
 * エラー時は空配列を返す。
 */
export async function fetchCourses(): Promise<Course[]> {
  const baseUrl = getSyllabusBaseUrl();
  try {
    const response = await fetch(`${baseUrl}/courses`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch courses: ${response.status} ${response.statusText}`
      );
    }
    return (await response.json()) as Course[];
  } catch (err) {
    console.error("Error fetching courses:", err);
    return [];
  }
}
