import type { Course } from "@/course";
import { RestApiCourseRepositoryAdapter } from "./restApiAdapter";

describe("RestApiCourseRepositoryAdapter", () => {
  const apiBaseUrl = "http://example.com/api";
  let adapter: RestApiCourseRepositoryAdapter;
  const course: Course = {
    courseId: "1",
    year: 2025,
    title: "アカデミックスキル",
    numbering: "CS2101B",
    courseNumber: "11001.2",
    numberOfProper: 20,
    semester: [1],
    numberOfCredits: 1,
    note: "-----",
    japaneseUrl:
      "/Portal/Public/Syllabus/DetailMain.aspx?lct_year=2025&lct_cd=55-11001.2&je_cd=1&lct_idx=A000000000204097",
    englishUrl:
      "/Portal/Public/Syllabus/DetailMain.aspx?lct_year=2025&lct_cd=55-11001.2&je_cd=2&lct_idx=A000000000204097",
    openAccount: "-----",
    max60CreditsFlag: "対象外",
    subjectDistinguished: "-----",
    courseDescription:
      "授業の主題　討論、発表、レポート作成、グループ活動を通じて、大学での学習に必要なスキルを身につけると同時に、クラスメイトと親密になることによって、大学生活への適応を図る。　本科目は、学術リテラシー教育にかかわる基礎的な科目の一つです。学術リテラシー教育では、以下の能力や知識を養成します。\n・自律的・主体的な学修姿勢、研究活動に必要な学修デザイン能力\n・文献やデータを調査・理解する能力、文献やデータの評価・分析能力\n・論理的思考力、 課題発見力\n・自己表現能力を含む知的コミュニケーション能力\n・研究倫理に関する知識及び学修成果や研究内容の発信方法に関する知識\n学修目標（到達目標） 新入生に対し、大学で学ぶ上でかかすことのできない主体的・自主的学習への動機づけを行い、専門教育を含む大学教育全般に対する能動的学習に導くことを目標とする。さらに、学生と教員及び学生相互のディスカッションを通して、大学生としての自己表現能力、学習デザイン能力、及び論理的な思考方法を育成する。\n授業概要 グループ活動とコミュニケーションを中心にすることによって、ガイダンス、ノートの取り方、レポート作成、クリティカル・リーディング、KJ法、引用の作法、レポート評価について、主体的・実践的に学ぶ。\n講義スケジュール\t講義回テーマ具体的な内容担当教員\t1ガイダンス\t2講義の受け方・資料の調べ方\t3問題発見・グループワーク\t4レポート・論文の書き方・思考法\t5レポート作成実践（１）\t6レポート作成実践（２）\t7レポート作成実践（３）\t8相互評価 評価方法と割合\n評価方法 成績は合格・不可で判定する。\n授業別ルーブリックの各項目のS、A、B、C、不可で評価判定を用い、総合的にS、A、B、C、不可と評価する。総合的判定S、A、B、Cを合格とする\n評価の割合 出席・ゼミにおける発表・レポート等を総合して判定する。授業には、３分の２以上の出席を必要とする。３分の１未満は休んでよいというわけでは全くなく，当然３分の２以上の出席でも不合格の場合もある。\nルーブリック\n【授業別ルーブリック】\t評価項目評価基準\tSABC不可\t課題非常に適切かつ優れた課題設定ができている非常に適切な課題設定ができている適切な課題設定ができている課題設定がやや不適切である課題設定が不適切である\t論理非常に論理的な主張をしていて、根拠に妥当性があり、非常に説得力がある論理的な主張をしていて、根拠に妥当性があり、非常に説得力がある論理的な主張をしていて、根拠に妥当性があり、説得力があるおおむね論理的な主張をしていて、おおむね根拠に妥当性があるがやや欠ける部分があり、説得力があまりない全く論理的ではなく、根拠も妥当性がなく、説得力が全くない\t条件条件を完全に満たしている\t条件を十分満たしている\t条件を満たしているおおむね条件を満たしているが、やや欠ける部分がある\t全く条件を満たしていない\t体裁レポートとして非常に体裁が整っていて、誤字脱字や文法の誤りがなく、引用方法などが非常に適切レポートとして非常に体裁が整っていて、誤字脱字や文法の誤りがなく、引用方法などが適切レポートとして体裁が整っていて、誤字脱字や文法の誤りがなく、引用方法などが適切レポートとしておおむね体裁が整っているが、誤字脱字や文法の誤りが少しあり、引用方法などがやや不適切レポートとして体裁が全く整っていおらず、誤字脱字や文法の誤りが多く、引用方法などが不適切 授業時間外の学修に関する指示\n予習に関する指示 毎回の授業終了時に提示する次回の授業の予習課題を行うこと（目安　60～180分）\n予習に関する教材 オンデマンド教材以外の指示・課題\n復習に関する指示 毎回の授業終了時に提示する今回の授業の復習課題を行うこと（60 ～180 分）\n復習に関する教材 オンデマンド教材以外の指示・課題 教科書・参考書 参考書\n参考書\n書名 『アカデミック・スキルズ　大学生のための知的技法入門　第３版』\nISBN\n著者名 佐藤望\n出版社 慶應義塾大学出版会\n出版年 2020\n教科書・参考書補足 参考書は参考のためのものであり，必要だと思う人のみ購入して下さい．\nオフィスアワー・連絡先等（学生からの質問への対応方法等） 授業開始時に指示する。\n履修条件 なし。\n適正人数 20名\n受講者調整方法 クラス指定\nその他履修上の注意事項や学習上の助言 なし。 特記事項\nカリキュラムの中の位置づけ 必修科目",
    instructors: [
      {
        name: "小田桐拓志",
      },
    ],
    schedules: [
      {
        day: "水",
        period: 4,
      },
    ],
    classFormat: "対面のみ",
    lectureForm: "演習",
    targetStudents: "-----",
    lectureRoomInfo: "総合教育講義棟 C8講義室（対面のみ）",
    faculty: {
      faculty: "先導学類",
      department: "融合学域",
    },
    keywords: ["文章にまとめる", "発表する", "調べる"],
  };

  beforeEach(() => {
    adapter = new RestApiCourseRepositoryAdapter(apiBaseUrl);
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test("findCourseById returns course when found", async () => {
    const mockCourse = course;
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      text: async () => JSON.stringify(mockCourse),
    });

    const foundCourse = await adapter.findCourseById("1");
    expect(foundCourse).toEqual(mockCourse);
    expect(global.fetch).toHaveBeenCalledWith(`${apiBaseUrl}/courses/1`);
  });

  test("findCourseById returns null when course not found", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: "Not Found",
      text: async () => "Course not found",
    });

    const course = await adapter.findCourseById("999");
    expect(course).toBeNull();
    expect(global.fetch).toHaveBeenCalledWith(`${apiBaseUrl}/courses/999`);
  });

  test("saveCourse updates existing course", async () => {
    const existingCourse = course;
    const updatedCourse: Course = {
      ...course,
      lectureRoomInfo: "新しい講義室情報",
    };
    (global.fetch as jest.Mock)
      // First call to fetch existing courses
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ courses: [existingCourse] }),
      })
      // Second call to update the existing course
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify(updatedCourse),
      });

    await adapter.saveCourse(updatedCourse);

    const { courseId, ...updatedCourseWithoutId } = updatedCourse;
    expect(global.fetch).toHaveBeenNthCalledWith(1, `${apiBaseUrl}/courses`);
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      `${apiBaseUrl}/courses/1`,
      expect.objectContaining({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCourseWithoutId),
      })
    );
  });

  test("saveCourse creates new course when no duplicate", async () => {
    const newCourse = course;
    (global.fetch as jest.Mock)
      // First call to fetch existing courses
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ courses: [] }),
      })
      // Second call to create the new course
      .mockResolvedValueOnce({
        ok: true,
        status: 201,
        text: async () => "",
      });
    const { courseId, ...newCourseWithoutId } = newCourse;

    await adapter.saveCourse(newCourse);

    expect(global.fetch).toHaveBeenNthCalledWith(1, `${apiBaseUrl}/courses`);
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      `${apiBaseUrl}/courses`,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courses: [newCourseWithoutId],
        }),
      })
    );
  });

  test("saveCourse creates new course when existing courses returns null", async () => {
    const newCourse = course;
    (global.fetch as jest.Mock)
      // First call returns { courses: null }
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ courses: null }),
      })
      // Second call to create the new course
      .mockResolvedValueOnce({
        ok: true,
        status: 201,
        text: async () => JSON.stringify(course),
      });
    const { courseId, ...newCourseWithoutId } = newCourse;

    await adapter.saveCourse(newCourse);

    expect(global.fetch).toHaveBeenNthCalledWith(1, `${apiBaseUrl}/courses`);
    expect(global.fetch).toHaveBeenNthCalledWith(
      2,
      `${apiBaseUrl}/courses`,
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courses: [newCourseWithoutId],
        }),
      })
    );
  });

  test("saveCourse throws error when course is null", async () => {
    await expect(adapter.saveCourse(null as unknown as Course)).rejects.toThrow(
      "Course object is required."
    );
  });

  test("findCourseById throws error on fetch failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      text: async () => "Server error",
    });

    await expect(adapter.findCourseById("1")).rejects.toThrow(
      "Error fetching course: 500 Internal Server Error Server error"
    );
  });

  test("saveCourse throws error on fetch failure when fetching existing courses", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      text: async () => "Server error",
    });
    const newCourse = course;

    await expect(adapter.saveCourse(newCourse)).rejects.toThrow(
      "Error fetching existing courses: 500 Internal Server Error Server error"
    );
  });

  test("saveCourse throws error on fetch failure when updating course", async () => {
    const existingCourse = course;
    const updatedCourse: Course = {
      ...course,
      lectureRoomInfo: "新しい講義室情報",
    };
    (global.fetch as jest.Mock)
      // First call to fetch existing courses
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ courses: [existingCourse] }),
      })
      // Second call to update the existing course fails
      .mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        text: async () => "Invalid data",
      });

    await expect(adapter.saveCourse(updatedCourse)).rejects.toThrow(
      "Error updating course: 400 Bad Request Invalid data"
    );
  });

  test("saveCourse throws error on fetch failure when creating course", async () => {
    const newCourse = course;

    (global.fetch as jest.Mock)
      // First call to fetch existing courses
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ courses: [] }),
      })
      // Second call to create the new course fails
      .mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: "Bad Request",
        text: async () => "Invalid data",
      });

    const { courseDescription, ...newCourseWithoutDescription } = newCourse;
    await expect(adapter.saveCourse(newCourse)).rejects.toThrow(
      `Error saving course: ${JSON.stringify(
        newCourseWithoutDescription,
        null,
        2
      )} 400 Bad Request Invalid data`
    );
  });

  test("deleteCourse sends DELETE request to correct URL", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 204,
      text: async () => "",
    });

    await adapter.deleteCourse("1");

    expect(global.fetch).toHaveBeenCalledWith(`${apiBaseUrl}/courses/1`, {
      method: "DELETE",
    });
  });

  test("deleteCourse throws error on fetch failure", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      text: async () => "Server error",
    });

    await expect(adapter.deleteCourse("1")).rejects.toThrow(
      "Error deleting course: 500 Internal Server Error Server error"
    );
  });
});
