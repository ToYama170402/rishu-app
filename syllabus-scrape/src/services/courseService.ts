import { CourseBuilder } from "@/course/builders";
import {
  type CourseFactoryData,
  CourseFactoryRegistry,
  SyllabusCourseFactory,
} from "@/course/factories";
import {
  CourseConverter,
  type SyllabusConversionData,
  SyllabusConversionStrategy,
} from "@/course/strategies";
import type { Course } from "@/course/types/course";
import type { SyllabusCourse } from "@/course/types/syllabusCourse";
import type { SyllabusSearchResult } from "@/course/types/syllabusSearchResult";

export class CourseService {
  private factory = new SyllabusCourseFactory();
  private converter = new CourseConverter(new SyllabusConversionStrategy());

  // Factory パターンを使用してコースを作成
  createCourse(data: CourseFactoryData): Course {
    return this.factory.createCourse(data);
  }

  // SyllabusCourseとSyllabusSearchResultからCourseを作成
  createCourseFromSyllabusData(
    syllabusCourse: SyllabusCourse,
    searchResult: SyllabusSearchResult,
    year: number,
    description?: string
  ): Course {
    const factoryData: CourseFactoryData = {
      syllabusCourse,
      searchResult,
      year,
      ...(description && { description }),
    };
    return this.createCourse(factoryData);
  }

  // Builder パターンを直接使用する場合
  buildCourseManually(year: number): CourseBuilder {
    return CourseBuilder.create().withYear(year);
  }

  // Strategy パターンを使用してデータを変換
  convertCourseData(data: SyllabusConversionData): Course {
    const result = this.converter.convert(data);
    return Array.isArray(result) ? result[0]! : result;
  }

  // 複数のコースを一括作成
  createMultipleCourses(courseDataList: CourseFactoryData[]): Course[] {
    const batchFactory = CourseFactoryRegistry.create("batch");
    return batchFactory.createCourse({ courses: courseDataList }) as Course[];
  }

  // CSVデータからコースを作成
  createCoursesFromCsv(csvRows: string[][]): Course[] {
    const csvFactory = CourseFactoryRegistry.create("csv");
    return csvFactory.createCourse({ csvRows }) as Course[];
  }

  // コース情報の検証
  validateCourseData(course: Course): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 必須フィールドのチェック
    if (!course.year || course.year < 1900 || course.year > 2100) {
      errors.push("有効な年度が必要です");
    }

    if (!course.title?.trim()) {
      errors.push("コースタイトルが必要です");
    }

    if (!course.courseNumber?.trim()) {
      errors.push("コース番号が必要です");
    }

    if (course.numberOfCredits < 0) {
      errors.push("単位数は0以上である必要があります");
    }

    if (!course.faculty?.department || !course.faculty?.faculty) {
      errors.push("学部・学科情報が必要です");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // コース情報を更新
  updateCourse(existingCourse: Course, updates: Partial<Course>): Course {
    return CourseBuilder.create()
      .withYear(updates.year || existingCourse.year)
      .withBasicInfo(
        updates.title || existingCourse.title,
        updates.numbering || existingCourse.numbering,
        updates.courseNumber || existingCourse.courseNumber
      )
      .withCredits(updates.numberOfCredits || existingCourse.numberOfCredits)
      .withDescription(
        updates.courseDescription || existingCourse.courseDescription
      )
      .withInstructors(updates.instructors || existingCourse.instructors)
      .withSchedule(updates.schedule || existingCourse.schedule)
      .withSemester(updates.semester || existingCourse.semester)
      .withFaculty(updates.faculty || existingCourse.faculty)
      .withUrls(
        updates.englishUrl || existingCourse.englishUrl,
        updates.japaneseUrl || existingCourse.japaneseUrl
      )
      .withKeywords(updates.keywords || existingCourse.keywords)
      .withNote(updates.note || existingCourse.note)
      .build();
  }

  // コースデータのフィルタリング
  filterCourses(
    courses: Course[],
    filters: {
      year?: number;
      department?: string;
      faculty?: string;
      minCredits?: number;
      maxCredits?: number;
      keywords?: string[];
      instructor?: string;
    }
  ): Course[] {
    return courses.filter((course) => {
      // 年度フィルター
      if (filters.year && course.year !== filters.year) {
        return false;
      }

      // 学域フィルター
      if (
        filters.department &&
        course.faculty.department !== filters.department
      ) {
        return false;
      }

      // 学類フィルター
      if (filters.faculty && course.faculty.faculty !== filters.faculty) {
        return false;
      }

      // 単位数フィルター
      if (filters.minCredits && course.numberOfCredits < filters.minCredits) {
        return false;
      }

      if (filters.maxCredits && course.numberOfCredits > filters.maxCredits) {
        return false;
      }

      // キーワードフィルター
      if (filters.keywords && filters.keywords.length > 0) {
        const hasKeyword = filters.keywords.some(
          (keyword) =>
            course.keywords.some((ck) =>
              ck.toLowerCase().includes(keyword.toLowerCase())
            ) ||
            course.title.toLowerCase().includes(keyword.toLowerCase()) ||
            course.courseDescription
              .toLowerCase()
              .includes(keyword.toLowerCase())
        );
        if (!hasKeyword) {
          return false;
        }
      }

      // 担当教員フィルター
      if (filters.instructor) {
        const hasInstructor = course.instructors.some((instructor) =>
          instructor.name
            ?.toLowerCase()
            .includes(filters.instructor!.toLowerCase())
        );
        if (!hasInstructor) {
          return false;
        }
      }

      return true;
    });
  }

  // コースデータのソート
  sortCourses(
    courses: Course[],
    sortBy: "year" | "title" | "credits" | "courseNumber",
    order: "asc" | "desc" = "asc"
  ): Course[] {
    const sorted = [...courses].sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case "year":
          comparison = a.year - b.year;
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "credits":
          comparison = a.numberOfCredits - b.numberOfCredits;
          break;
        case "courseNumber":
          comparison = a.courseNumber.localeCompare(b.courseNumber);
          break;
      }

      return order === "asc" ? comparison : -comparison;
    });

    return sorted;
  }
}
