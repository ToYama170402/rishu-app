import crypto from "node:crypto";
import type { Course } from "@/course/types/course";
import type { DayPeriod } from "@/course/types/dayPeriod";
import type { Department, Faculty } from "@/course/types/department";
import type { Instructor } from "@/course/types/instructor";
import type { Semester } from "@/course/types/semester";
import type { SyllabusCourse } from "@/course/types/syllabusCourse";
import type { SyllabusSearchResult } from "@/course/types/syllabusSearchResult";

export class CourseBuilder {
  private course: Partial<Course> = {};

  static create(): CourseBuilder {
    return new CourseBuilder();
  }

  withYear(year: number): this {
    this.course.year = year;
    return this;
  }

  withBasicInfo(title: string, numbering: string, courseNumber: string): this {
    this.course.title = title;
    this.course.numbering = numbering;
    this.course.courseNumber = courseNumber;
    return this;
  }

  withSyllabusData(syllabusCourse: SyllabusCourse): this {
    Object.assign(this.course, {
      title: syllabusCourse.title,
      instructors: syllabusCourse.instructors,
      numbering: syllabusCourse.numbering,
      courseNumber: syllabusCourse.courseNumber,
      lectureForm: syllabusCourse.lectureForm,
      numberOfProper: syllabusCourse.numberOfProper,
      schedules: syllabusCourse.schedules,
      classFormat: syllabusCourse.classFormat,
      subjectDistinguished: syllabusCourse.subjectDistinguished,
      semester: syllabusCourse.semester,
      numberOfCredits: syllabusCourse.numberOfCredits,
      max60CreditsFlag: syllabusCourse.max60CreditsFlag,
      targetStudents: syllabusCourse.targetStudents,
      keywords: syllabusCourse.keywords,
      lectureRoomInfo: syllabusCourse.lectureRoomInfo,
      openAccount: syllabusCourse.openAccount,
      note: syllabusCourse.note,
      faculty: this.createFacultyFromDepartment(syllabusCourse.department),
    });
    return this;
  }

  withSearchResult(searchResult: SyllabusSearchResult): this {
    this.course.englishUrl = searchResult.englishUrl;
    this.course.japaneseUrl = searchResult.japaneseUrl;

    if (searchResult.faculty) {
      this.course.faculty = searchResult.faculty;
    }

    // 検索結果から追加情報を補完
    if (searchResult.title && !this.course.title) {
      this.course.title = searchResult.title;
    }
    if (searchResult.instructors && !this.course.instructors) {
      this.course.instructors = searchResult.instructors;
    }
    if (searchResult.semester && !this.course.semester) {
      this.course.semester = searchResult.semester;
    }
    if (searchResult.schedules && !this.course.schedules) {
      this.course.schedules = searchResult.schedules;
    }

    return this;
  }

  withDescription(description: string): this {
    this.course.courseDescription = description;
    return this;
  }

  withInstructors(instructors: Instructor[]): this {
    this.course.instructors = instructors;
    return this;
  }

  withSchedule(schedule: DayPeriod[]): this {
    this.course.schedules = schedule;
    return this;
  }

  withSemester(semester: Semester[]): this {
    this.course.semester = semester;
    return this;
  }

  withCredits(credits: number): this {
    this.course.numberOfCredits = credits;
    return this;
  }

  withFaculty(faculty: Faculty): this {
    this.course.faculty = faculty;
    return this;
  }

  withUrls(englishUrl: string, japaneseUrl: string): this {
    this.course.englishUrl = englishUrl;
    this.course.japaneseUrl = japaneseUrl;
    return this;
  }

  withKeywords(keywords: string[]): this {
    this.course.keywords = keywords;
    return this;
  }

  withNote(note: string): this {
    this.course.note = note;
    return this;
  }

  private createFacultyFromDepartment(department: Department): Faculty {
    // TypeScriptの厳密な型チェックを満たすために、各部署に対応する具体的なFacultyを返す
    switch (department) {
      case "融合学域":
        return { department: "融合学域", faculty: "先導学類" };
      case "理工学域":
        return { department: "理工学域", faculty: "数物科学類" };
      case "人間社会学域":
        return { department: "人間社会学域", faculty: "人文学類" };
      case "医薬保健学域":
        return { department: "医薬保健学域", faculty: "医学類" };
      default:
        return { department: "融合学域", faculty: "先導学類" };
    }
  }

  build(): Course {
    // Generate and assign id before validation
    this.validate();
    this.course.courseId = this.generateId(
      this.course as Omit<Course, "courseId">
    );
    return this.course as Course;
  }

  private validate(): void {
    const requiredFields: (keyof Course)[] = [
      "year",
      "title",
      "numbering",
      "courseNumber",
      "numberOfProper",
      "semester",
      "numberOfCredits",
      "englishUrl",
      "japaneseUrl",
      "subjectDistinguished",
      "courseDescription",
      "instructors",
      "schedules",
      "targetStudents",
      "lectureRoomInfo",
      "faculty",
    ];

    const missingFields = requiredFields.filter((field) => {
      const value = this.course[field];
      if (Array.isArray(value)) {
        return value.length === 0;
      }
      return value === undefined || value === null || value === "";
    });

    if (missingFields.length > 0) {
      throw new Error(
        `必須フィールドが不足しています: ${missingFields.join(", ")}`
      );
    }
  }

  generateId(course: Omit<Course, "courseId">): string {
    const key = `${course.year}-${course.title}-${course.faculty.faculty}`;
    return crypto.createHash("sha256").update(key).digest("hex");
  }

  // デフォルト値で不足フィールドを補完するメソッド
  withDefaults(): this {
    if (!this.course.courseDescription) {
      this.course.courseDescription = "";
    }
    if (!this.course.keywords) {
      this.course.keywords = [];
    }
    if (!this.course.note) {
      this.course.note = "";
    }
    if (!this.course.openAccount) {
      this.course.openAccount = "";
    }
    if (!this.course.max60CreditsFlag) {
      this.course.max60CreditsFlag = "";
    }
    if (!this.course.targetStudents) {
      this.course.targetStudents = "";
    }
    if (!this.course.lectureRoomInfo) {
      this.course.lectureRoomInfo = "";
    }
    if (!this.course.englishUrl) {
      this.course.englishUrl = "";
    }
    if (!this.course.japaneseUrl) {
      this.course.japaneseUrl = "";
    }
    return this;
  }
}
