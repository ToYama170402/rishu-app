import type { Course } from "@/course/types";

export interface CourseRepositoryAdapter {
  /**
   * 指定したIDのコースを検索します。
   * @param id コースID
   * @returns コース情報またはnull
   */
  findCourseById(id: string): Promise<Course | null>;

  /**
   * コース情報を保存します。
   * @param course 保存するコース情報
   */
  saveCourse(course: Course): Promise<void>;

  /**
   * 指定したIDのコース情報を削除します。
   * @param id コースID
   */
  deleteCourse(id: string): Promise<void>;
}

export class CourseRepository {
  private adapter: CourseRepositoryAdapter;

  constructor(adapter: CourseRepositoryAdapter) {
    this.adapter = adapter;
  }

  private validateCourseId(id: string): void {
    if (!id || id.trim() === "") {
      throw new Error("Course ID must not be empty.");
    }
  }

  async findCourseById(id: string): Promise<Course | null> {
    this.validateCourseId(id);
    try {
      return await this.adapter.findCourseById(id);
    } catch (err) {
      throw new Error(
        `Failed to find course with ID ${id}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  async saveCourse(course: Course): Promise<void> {
    try {
      await this.adapter.saveCourse(course);
    } catch (err) {
      throw new Error(
        `Failed to save course: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  async deleteCourse(id: string): Promise<void> {
    this.validateCourseId(id);
    try {
      await this.adapter.deleteCourse(id);
    } catch (err) {
      throw new Error(
        `Failed to delete course with ID ${id}: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }
}
