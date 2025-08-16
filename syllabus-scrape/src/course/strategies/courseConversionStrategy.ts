import type { Course } from "@/course/types/course";
import type { SyllabusCourse } from "@/course/types/syllabusCourse";
import type { SyllabusSearchResult } from "@/course/types/syllabusSearchResult";
import { CourseBuilder } from "@/course/builders/courseBuilder";

export interface CourseConversionStrategy {
  convert(data: unknown): Course | Course[];
}

export interface SyllabusConversionData {
  syllabusCourse: SyllabusCourse;
  searchResult: SyllabusSearchResult;
  year: number;
  description?: string;
}

export interface CsvConversionData {
  csvData: string[][];
  hasHeader?: boolean;
}

export interface JsonConversionData {
  jsonData: any[];
}

export class SyllabusConversionStrategy implements CourseConversionStrategy {
  convert(data: SyllabusConversionData): Course {
    return CourseBuilder.create()
      .withYear(data.year)
      .withSyllabusData(data.syllabusCourse)
      .withSearchResult(data.searchResult)
      .withDescription(data.description || "")
      .withDefaults()
      .build();
  }
}

export class CsvConversionStrategy implements CourseConversionStrategy {
  convert(data: CsvConversionData): Course[] {
    const startIndex = data.hasHeader ? 1 : 0;
    const dataRows = data.csvData.slice(startIndex);

    return dataRows.map((row, index) => {
      try {
        return this.convertRow(row);
      } catch (error) {
        throw new Error(
          `CSVの${
            index + startIndex + 1
          }行目の変換中にエラーが発生しました: ${error}`
        );
      }
    });
  }

  private convertRow(row: string[]): Course {
    return CourseBuilder.create()
      .withYear(this.parseYear(row[0] || ""))
      .withBasicInfo(
        this.parseString(row[1] || ""), // title
        this.parseString(row[2] || ""), // numbering
        this.parseString(row[3] || "") // courseNumber
      )
      .withCredits(this.parseNumber(row[4] || ""))
      .withDescription(this.parseString(row[5] || ""))
      .withNote(this.parseString(row[6] || ""))
      .withDefaults()
      .build();
  }

  private parseYear(value: string): number {
    const year = parseInt(value.trim());
    if (isNaN(year) || year < 1900 || year > 2100) {
      throw new Error(`無効な年度です: ${value}`);
    }
    return year;
  }

  private parseNumber(value: string): number {
    const num = parseInt(value.trim());
    return isNaN(num) ? 0 : num;
  }

  private parseString(value: string): string {
    return value?.trim() || "";
  }
}

export class JsonConversionStrategy implements CourseConversionStrategy {
  convert(data: JsonConversionData): Course[] {
    return data.jsonData.map((item, index) => {
      try {
        return this.convertJsonItem(item);
      } catch (error) {
        throw new Error(
          `JSONデータの${index + 1}項目の変換中にエラーが発生しました: ${error}`
        );
      }
    });
  }

  private convertJsonItem(item: any): Course {
    return CourseBuilder.create()
      .withYear(this.parseYear(item.year))
      .withBasicInfo(
        this.parseString(item.title),
        this.parseString(item.numbering),
        this.parseString(item.courseNumber)
      )
      .withCredits(this.parseNumber(item.credits))
      .withDescription(this.parseString(item.description))
      .withNote(this.parseString(item.note))
      .withKeywords(this.parseArray(item.keywords))
      .withDefaults()
      .build();
  }

  private parseYear(value: any): number {
    if (typeof value === "number") return value;
    const year = parseInt(String(value));
    if (isNaN(year) || year < 1900 || year > 2100) {
      throw new Error(`無効な年度です: ${value}`);
    }
    return year;
  }

  private parseNumber(value: any): number {
    if (typeof value === "number") return value;
    const num = parseInt(String(value));
    return isNaN(num) ? 0 : num;
  }

  private parseString(value: any): string {
    return String(value || "").trim();
  }

  private parseArray(value: any): string[] {
    if (Array.isArray(value)) {
      return value.map((v) => String(v).trim()).filter(Boolean);
    }
    if (typeof value === "string") {
      return value
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    }
    return [];
  }
}

export class BatchConversionStrategy implements CourseConversionStrategy {
  private strategies = new Map<string, CourseConversionStrategy>();

  constructor() {
    this.strategies.set("syllabus", new SyllabusConversionStrategy());
    this.strategies.set("csv", new CsvConversionStrategy());
    this.strategies.set("json", new JsonConversionStrategy());
  }

  convert(data: { type: string; data: unknown }[]): Course[] {
    const results: Course[] = [];

    for (const item of data) {
      const strategy = this.strategies.get(item.type);
      if (!strategy) {
        throw new Error(`未対応の変換タイプです: ${item.type}`);
      }

      const result = strategy.convert(item.data);
      if (Array.isArray(result)) {
        results.push(...result);
      } else {
        results.push(result);
      }
    }

    return results;
  }

  addStrategy(type: string, strategy: CourseConversionStrategy): void {
    this.strategies.set(type, strategy);
  }
}

export class CourseConverter {
  constructor(private strategy: CourseConversionStrategy) {}

  setStrategy(strategy: CourseConversionStrategy): void {
    this.strategy = strategy;
  }

  convert(data: unknown): Course | Course[] {
    return this.strategy.convert(data);
  }
}

// データ検証戦略
export interface DataValidationStrategy {
  validate(data: unknown): boolean;
  getErrors(data: unknown): string[];
}

export class SyllabusDataValidationStrategy implements DataValidationStrategy {
  validate(data: unknown): boolean {
    return this.getErrors(data).length === 0;
  }

  getErrors(data: unknown): string[] {
    const errors: string[] = [];

    if (!this.isSyllabusConversionData(data)) {
      errors.push("無効なSyllabusConversionDataです");
      return errors;
    }

    if (!data.year || data.year < 1900 || data.year > 2100) {
      errors.push("有効な年度が必要です");
    }

    if (!data.syllabusCourse?.title) {
      errors.push("コースタイトルが必要です");
    }

    if (!data.searchResult?.englishUrl && !data.searchResult?.japaneseUrl) {
      errors.push("少なくとも1つのURLが必要です");
    }

    return errors;
  }

  private isSyllabusConversionData(
    data: unknown
  ): data is SyllabusConversionData {
    return (
      typeof data === "object" &&
      data !== null &&
      "syllabusCourse" in data &&
      "searchResult" in data &&
      "year" in data
    );
  }
}
