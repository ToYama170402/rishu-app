import { promises as fs } from "node:fs";
import type { Course } from "@/course";
import type { CourseRepositoryAdapter } from "../repositories";

async function readJsonFile<T>(filePath: string): Promise<T | null> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T;
  } catch {
    return null;
  }
}

async function writeJsonFile<T>(filePath: string, data: T): Promise<void> {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, jsonData, "utf-8");
  } catch (error) {
    throw new Error(
      `Error writing JSON file at ${filePath}: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

export class JsonFileCourseRepositoryAdapter
  implements CourseRepositoryAdapter
{
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async findCourseById(id: string): Promise<Course | null> {
    const courses = (await readJsonFile<Course[]>(this.filePath)) ?? [];
    return courses.find((c) => c.id === id) || null;
  }

  async saveCourse(course: Course): Promise<void> {
    if (!course) {
      throw new Error("Course object is required.");
    }
    if (!course.id) {
      throw new Error("Course must have a valid ID.");
    }
    const existingCourses = (await readJsonFile<Course[]>(this.filePath)) ?? [];
    // 既存コース一覧から同じIDのものを除外
    const updatedCourses = existingCourses.filter(
      (c) =>
        c.id !== course.id &&
        c.title !== course.title &&
        c.faculty.faculty !== course.faculty.faculty
    );
    // 新しいコースを追加して保存
    return writeJsonFile<Course[]>(this.filePath, [...updatedCourses, course]);
  }

  async deleteCourse(id: string): Promise<void> {
    const courses = (await readJsonFile<Course[]>(this.filePath)) ?? [];
    const updatedCourses = courses.filter((c) => c.id !== id);
    return writeJsonFile<Course[]>(this.filePath, updatedCourses);
  }
}
