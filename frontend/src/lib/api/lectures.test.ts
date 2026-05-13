import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import {
  fetchLectures,
  fetchLectureDetail,
  type apiResponse,
} from "./lectures";

const API_HEADER_ROW = [
  "講義番号",
  "科目区分",
  "講義名",
  "時限",
  "担当教員",
  "対象学年",
  "定員",
  "応募者数(合計)",
  "第1希望",
  "第2希望",
  "第3希望",
  "第4希望",
  "第5希望",
  "第6希望",
];

const API_ROW_1 = [
  "00001",
  "ＧＳ科目",
  "数学入門",
  "月1",
  "山田太郎",
  "1年",
  "20",
  "10",
  "5",
  "3",
  "2",
  "1",
  "0",
  "0",
];

const API_ROW_2 = [
  "00002",
  "ＧＳ言語科目",
  "英語基礎",
  "火2",
  "鈴木花子",
  "1年",
  "25",
  "15",
  "8",
  "4",
  "2",
  "1",
  "0",
  "0",
];

function makeLecturesApiResponse(overrides: Partial<apiResponse> = {}) {
  const rows = overrides.rows ?? [API_HEADER_ROW, API_ROW_1, API_ROW_2];
  return {
    ok: true,
    reason: "cached" as const,
    preparingNext: false,
    currentCollectStartedAt: null,
    lastCollectAt: "2026-04-09T00:00:00.000Z",
    recentRefreshes: [
      {
        startedAt: "2026-04-09T00:00:00.000Z",
        finishedAt: "2026-04-09T00:00:02.000Z",
        durationMs: 2000,
        success: true,
      },
    ],
    rowCount: rows.length,
    rows,
    ...overrides,
  };
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("fetchLectures (JSON API contract)", () => {
  test("reason=cached の rows を LotteryCourseStatus[] に変換して返す", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => makeLecturesApiResponse({ reason: "cached" }),
    } as Response);

    const result = await fetchLectures();

    expect(result).toHaveLength(2);
    expect(result[0].number).toBe("00001");
    expect(result[0].title).toBe("数学入門");
    expect(result[0].capacity).toBe(20);
    expect(result[0].applicants.all).toBe(10);
    expect(result[1].number).toBe("00002");
    expect(result[1].title).toBe("英語基礎");
  });

  test("reason=refreshing_in_background でも rows を通常どおり変換して返す", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () =>
        makeLecturesApiResponse({ reason: "refreshing_in_background" }),
    } as Response);

    const result = await fetchLectures();

    expect(result).toHaveLength(2);
    expect(result[0].number).toBe("00001");
    expect(result[1].number).toBe("00002");
  });

  test("reason=initializing の場合は待機後に再取得する", async () => {
    const nowSpy = vi.spyOn(Date, "now").mockReturnValue(100000);
    const setTimeoutSpy = vi
      .spyOn(globalThis, "setTimeout")
      .mockImplementation(((..._args: unknown[]) => 0) as typeof setTimeout);

    vi.mocked(fetch)
      .mockResolvedValueOnce({
        ok: true,
        json: async () =>
          makeLecturesApiResponse({
            reason: "initializing",
            currentCollectStartedAt: null,
            recentRefreshes: [],
            rows: [API_HEADER_ROW],
            rowCount: 1,
          }),
      } as Response)
      .mockResolvedValueOnce({
        ok: true,
        json: async () =>
          makeLecturesApiResponse({
            reason: "cached",
            rows: [API_HEADER_ROW, API_ROW_1],
            rowCount: 2,
          }),
      } as Response);

    const result = await fetchLectures();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(setTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(setTimeoutSpy.mock.calls[0][1]).toBe(3000);
    expect(result).toHaveLength(1);
    expect(result[0].number).toBe("00001");

    setTimeoutSpy.mockRestore();
    nowSpy.mockRestore();
  });

  test("fetchLectures は ISR 用オプション付きで fetch を呼ぶ", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => makeLecturesApiResponse(),
    } as Response);

    await fetchLectures();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(vi.mocked(fetch).mock.calls[0][1]).toMatchObject({
      mode: "cors",
      redirect: "follow",
      next: { revalidate: 50 },
    });
  });
});

describe("fetchLectureDetail (request options)", () => {
  test("query と ISR オプションを付けて fetch を呼ぶ", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    } as Response);

    await fetchLectureDetail("講義 1");

    expect(fetch).toHaveBeenCalledTimes(1);
    const [url, options] = vi.mocked(fetch).mock.calls[0];
    expect(url as string).toContain("mode=search");
    expect(url as string).toContain(`word=${encodeURIComponent("講義 1")}`);
    expect(options).toMatchObject({
      mode: "cors",
      redirect: "follow",
      next: { revalidate: 50 },
    });
  });
});
