import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchLectures, fetchLectureDetail } from "./lectures";

const TSV_FIXTURE =
  "00001\\tＧＳ科目\\t数学入門\\t月1\\t山田太郎\\t1年\\t20\\t10\\t5\\t3\\t2\\t1\\t0\\t0\\n" +
  "00002\\tＧＳ言語科目\\t英語基礎\\t火2\\t鈴木花子\\t1年\\t25\\t15\\t8\\t4\\t2\\t1\\t0\\t0\\n";

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("fetchLectures", () => {
  test("TSV データを取得して LotteryCourseStatus[] に変換して返す", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      text: async () => TSV_FIXTURE,
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

  test("レスポンスが ok でない場合は Error を投げる", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    await expect(fetchLectures()).rejects.toThrow(
      "Failed to fetch lectures: 500 Internal Server Error",
    );
  });

  test("fetch 自体が失敗した場合は Error を投げる", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Network error"));

    await expect(fetchLectures()).rejects.toThrow("Network error");
  });
});

describe("fetchLectureDetail", () => {
  test("指定した講義番号の詳細情報を返す", async () => {
    const detail = { number: "00001", title: "数学入門" };
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => detail,
    } as Response);

    const result = await fetchLectureDetail("00001");

    expect(result).toEqual(detail);
    const calledUrl = vi.mocked(fetch).mock.calls[0][0] as string;
    expect(calledUrl).toContain("00001");
  });

  test("レスポンスが ok でない場合は Error を投げる", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 404,
      statusText: "Not Found",
    } as Response);

    await expect(fetchLectureDetail("00001")).rejects.toThrow(
      "Failed to fetch lecture detail: 404 Not Found",
    );
  });

  test("講義番号が URL エンコードされる", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    } as Response);

    await fetchLectureDetail("講義 1");

    const calledUrl = vi.mocked(fetch).mock.calls[0][0] as string;
    expect(calledUrl).toContain(encodeURIComponent("講義 1"));
  });
});
