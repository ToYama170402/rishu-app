import { CourseBuilder } from "@/course/builders/courseBuilder";
import type { Course } from "@/course/types/course";
import type { SyllabusCourse } from "@/course/types/syllabusCourse";
import type { SyllabusSearchResult } from "@/course/types/syllabusSearchResult";

export interface CourseFactoryData {
  syllabusCourse: SyllabusCourse;
  searchResult: SyllabusSearchResult;
  year: number;
  description?: string;
}

export interface BatchCourseData {
  courses: CourseFactoryData[];
}

export interface CsvCourseData {
  csvRows: string[][];
}

export abstract class CourseFactory {
  abstract createCourse(data: unknown): Course | Course[];
}

export class SyllabusCourseFactory extends CourseFactory {
  createCourse(data: CourseFactoryData): Course {
    return CourseBuilder.create()
      .withYear(data.year)
      .withSyllabusData(data.syllabusCourse)
      .withSearchResult(data.searchResult)
      .withDescription(data.description || "")
      .withDefaults()
      .build();
  }
}

export class BatchCourseFactory extends CourseFactory {
  private syllabusFactory = new SyllabusCourseFactory();

  createCourse(data: BatchCourseData): Course[] {
    return data.courses.map((courseData) =>
      this.syllabusFactory.createCourse(courseData)
    );
  }
}

export class CsvCourseFactory extends CourseFactory {
  createCourse(data: CsvCourseData): Course[] {
    return data.csvRows.map((row, index) => {
      try {
        return CourseBuilder.create()
          .withYear(this.parseYear(row[0] || ""))
          .withBasicInfo(
            this.parseString(row[1] || ""), // title
            this.parseString(row[2] || ""), // numbering
            this.parseString(row[3] || "") // courseNumber
          )
          .withCredits(this.parseNumber(row[4] || ""))
          .withDescription(this.parseString(row[5] || ""))
          .withDefaults()
          .build();
      } catch (error) {
        throw new Error(
          `CSVの${index + 1}行目の処理中にエラーが発生しました: ${error}`
        );
      }
    });
  }

  private parseYear(value: string): number {
    const year = parseInt(value);
    if (isNaN(year) || year < 1900 || year > 2100) {
      throw new Error(`無効な年度です: ${value}`);
    }
    return year;
  }

  private parseNumber(value: string): number {
    const num = parseInt(value);
    return isNaN(num) ? 0 : num;
  }

  private parseString(value: string): string {
    return value?.trim() || "";
  }
}

// Factory Registry パターンの実装
export class CourseFactoryRegistry {
  private static factories = new Map<string, CourseFactory>();

  static register(type: string, factory: CourseFactory): void {
    CourseFactoryRegistry.factories.set(type, factory);
  }

  static create(type: string): CourseFactory {
    const factory = CourseFactoryRegistry.factories.get(type);
    if (!factory) {
      throw new Error(`未登録のファクトリータイプです: ${type}`);
    }
    return factory;
  }

  static getAvailableTypes(): string[] {
    return Array.from(CourseFactoryRegistry.factories.keys());
  }

  // デフォルトファクトリーを登録
  static initialize(): void {
    CourseFactoryRegistry.register("syllabus", new SyllabusCourseFactory());
    CourseFactoryRegistry.register("batch", new BatchCourseFactory());
    CourseFactoryRegistry.register("csv", new CsvCourseFactory());
  }
}

// 初期化
CourseFactoryRegistry.initialize();
