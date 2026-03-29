import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { fetchCourses } from "./courses";
import type { Course } from "@/types/course";

const COURSES_FIXTURE: { courses: Course[] } = {
  courses: [
    {
      id: "course-1",
      year: 2024,
      title: "数学入門",
      numbering: "GS001",
      courseNumber: "001",
      numberOfProper: 20,
      semester: [1],
      numberOfCredits: 2,
      note: "",
      englishUrl: "",
      japaneseUrl: "",
      keywords: ["数学"],
      openAccount: "",
      max60CreditsFlag: "",
      subjectDistinguished: "",
      courseDescription: "",
      instructors: [],
      schedules: [],
      classFormat: "",
      lectureForm: "",
      targetStudents: "",
      lectureRoomInfo: "",
      faculty: { department: "理工学域", faculty: "数物科学類" },
    },
  ],
};

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn());
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("fetchCourses", () => {
  test("Course[] を返す", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => COURSES_FIXTURE,
    } as Response);

    const result = await fetchCourses();

    expect(result).toEqual(COURSES_FIXTURE.courses);
    expect(result).toHaveLength(1);
    expect(result[0].title).toBe("数学入門");
  });

  test("レスポンスが ok でない場合は空配列を返す", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    } as Response);

    const result = await fetchCourses();

    expect(result).toEqual([]);
  });

  test("fetch 自体が失敗した場合は空配列を返す", async () => {
    vi.mocked(fetch).mockRejectedValue(new Error("Network error"));

    const result = await fetchCourses();

    expect(result).toEqual([]);
  });

  test("/courses パスを含む URL を呼び出す", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    await fetchCourses();

    const calledUrl = vi.mocked(fetch).mock.calls[0][0] as string;
    expect(calledUrl).toContain("/courses");
  });
});
