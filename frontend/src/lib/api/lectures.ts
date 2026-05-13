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

  // 参考
  // https://github.com/ogawa3427/risyu-api/blob/main/docs/memos/2026-04-09-client-reference-prompt.md
  type apiResponse = {
    ok: boolean;
    reason: "cached" | "refreshing_in_background" | "initializing";
    preparingNext: boolean; // true = バックグラウンドでスクレイピング中 or 起動済み
    currentCollectStartedAt: string | null; // 進行中スクレイピング開始時刻(ISO8601)。null = まだ起動していない
    lastCollectAt: string; // 前回スクレイピング完了時刻(ISO8601)
    recentRefreshes: Array<{
      startedAt: string;
      finishedAt: string;
      durationMs: number;
      success: boolean;
    }>;
    rowCount: number;
    rows: string[][]; // TSVデータ(行×列)
    message?: string; // preparingNext=true かつ stale の場合のみ
  };

  const data: apiResponse = (await response.json()) as apiResponse;
  if (data.reason === "initializing") {
    const avgDurationMs =
      data.recentRefreshes
        .filter((d) => d.success)
        .reduce((sum, d) => sum + d.durationMs, 0) /
      Math.max(1, data.recentRefreshes.filter((d) => d.success).length);
    const predictedFinishAt = data.currentCollectStartedAt
      ? new Date(data.currentCollectStartedAt).getTime() + avgDurationMs
      : Date.now() + avgDurationMs + 3000;
    const waitMs = Math.max(predictedFinishAt - Date.now(), 1000);
    await setTimeout(() => Promise.resolve(), waitMs);
    return fetchLectures(); // 再帰的にリトライ
  }

  return array2LectureArray(data.rows.slice(1)); // ヘッダー行を除外
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
