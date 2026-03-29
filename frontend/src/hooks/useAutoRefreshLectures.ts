"use client";

import { useEffect, useState } from "react";
import { fetchLectures } from "@/lib/api/lectures";
import type { LotteryCourseStatus } from "@/types/lotteryCourse";

const REFRESH_INTERVAL_MS = 50_000;

/**
 * 全抽選講義データを 50 秒ごとに自動リフレッシュするフック。
 *
 * @param initialLectures - Server Component で取得した初期データ
 * @returns 最新の抽選講義データ
 */
export function useAutoRefreshLectures(
  initialLectures: LotteryCourseStatus[],
): LotteryCourseStatus[] {
  const [lectures, setLectures] =
    useState<LotteryCourseStatus[]>(initialLectures);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let isCancelled = false;

    const refresh = () => {
      fetchLectures()
        .then((data) => {
          if (!isCancelled) {
            setLectures(data);
          }
        })
        .catch((err) =>
          console.error("useAutoRefreshLectures: fetch failed", err),
        )
        .finally(() => {
          if (!isCancelled) {
            timeoutId = setTimeout(refresh, REFRESH_INTERVAL_MS);
          }
        });
    };

    timeoutId = setTimeout(refresh, REFRESH_INTERVAL_MS);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, []);

  return lectures;
}
