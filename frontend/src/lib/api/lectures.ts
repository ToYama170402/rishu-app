import { parseSV } from "@/utils/parseSV";
import { array2LectureArray } from "@/utils/timeTable";
import type { LotteryCourseStatus } from "@/types/lotteryCourse";
import {
  LECTURES_API_URL,
  LECTURES_DEMO_URL_BROWSER,
  LECTURES_DEMO_URL_SERVER,
} from "./endpoints";

function getLecturesEndpoint(): string {
  if (process.env.NODE_ENV === "production") {
    return LECTURES_API_URL;
  }
  // 開発時はモックデータを使用（SSR か CSR かで切り替え）
  return typeof window === "undefined"
    ? LECTURES_DEMO_URL_SERVER
    : LECTURES_DEMO_URL_BROWSER;
}

/**
 * 全講義の志望者数情報を取得する。
 * Next.js ISR（50 秒 revalidate）に対応。
 */
export async function fetchLectures(): Promise<LotteryCourseStatus[]> {
  const endpoint = getLecturesEndpoint();
  const response = await fetch(endpoint, {
    mode: "cors",
    redirect: "follow",
    next: { revalidate: 50 },
  });
  if (!response.ok) {
    throw new Error(
      `Failed to fetch lectures: ${response.status} ${response.statusText}`,
    );
  }
  const data: string = await response.text();
  return array2LectureArray(parseSV(data, "\\t", "\\n"));
}

/**
 * 指定した講義番号の詳細情報を取得する。
 * Next.js ISR（50 秒 revalidate）に対応。
 */
export async function fetchLectureDetail(
  lectureNumber: string,
): Promise<unknown> {
  const endpoint = getLecturesEndpoint();
  const response = await fetch(
    `${endpoint}?mode=search&word=${encodeURIComponent(lectureNumber)}`,
    {
      mode: "cors",
      redirect: "follow",
      next: { revalidate: 50 },
    },
  );
  if (!response.ok) {
    throw new Error(
      `Failed to fetch lecture detail: ${response.status} ${response.statusText}`,
    );
  }
  return response.json();
}
