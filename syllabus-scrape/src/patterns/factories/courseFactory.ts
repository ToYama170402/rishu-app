import type { Course } from "@/types/course";
import type { SyllabusCourse } from "@/types/syllabusCourse";
import type { SyllabusSearchResult } from "@/types/syllabusSearchResult";
import { CourseBuilder } from "@/patterns/builders/courseBuilder";

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
    return data.courses.map(courseData => 
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
            this.parseString(row[3] || "")  // courseNumber
          )
          .withCredits(this.parseNumber(row[4] || ""))
          .withDescription(this.parseString(row[5] || ""))
          .withDefaults()
          .build();
      } catch (error) {
        throw new Error(`CSVの${index + 1}行目の処理中にエラーが発生しました: ${error}`);
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
    this.factories.set(type, factory);
  }

  static create(type: string): CourseFactory {
    const factory = this.factories.get(type);
    if (!factory) {
      throw new Error(`未登録のファクトリータイプです: ${type}`);
    }
    return factory;
  }

  static getAvailableTypes(): string[] {
    return Array.from(this.factories.keys());
  }

  // デフォルトファクトリーを登録
  static initialize(): void {
    this.register('syllabus', new SyllabusCourseFactory());
    this.register('batch', new BatchCourseFactory());
    this.register('csv', new CsvCourseFactory());
  }
}

// 初期化
CourseFactoryRegistry.initialize();
