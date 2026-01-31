import type { Course } from "@/course";
import type { CourseRepositoryAdapter } from "../repositories";

export class RestApiCourseRepositoryAdapter implements CourseRepositoryAdapter {
  constructor(private apiBaseUrl: string) {}

  async findCourseById(id: string): Promise<Course | null> {
    const intId = Number.parseInt(id, 10);
    const response = await fetch(`${this.apiBaseUrl}/courses/${intId}`);
    const body = await response.text();
    if (response.ok) {
      return JSON.parse(body) as Course;
    } else if (response.status === 404) {
      return null;
    } else {
      throw new Error(
        `Error fetching course: ${response.status} ${response.statusText} ${body}`
      );
    }
  }

  async saveCourse(course: Course): Promise<void> {
    if (!course) {
      throw new Error("Course object is required.");
    }
    // 講義情報の重複を避けるために既存講義情報を取得
    const existingCoursesResponse = await fetch(`${this.apiBaseUrl}/courses`);
    const existingCoursesBody = await existingCoursesResponse.text();
    if (!existingCoursesResponse.ok) {
      throw new Error(
        `Error fetching existing courses: ${existingCoursesResponse.status} ${existingCoursesResponse.statusText} ${existingCoursesBody}`
      );
    }
    let parsedData: { courses: Course[] | null };
    try {
      parsedData = existingCoursesBody
        ? JSON.parse(existingCoursesBody)
        : { courses: null };
    } catch (error) {
      throw new Error(
        `Failed to parse existing courses JSON. Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
    const existingCourses: Course[] = parsedData.courses || [];

    const duplicate = existingCourses.find(
      (c) =>
        c.year === course.year &&
        c.courseNumber === course.courseNumber &&
        c.faculty.department === course.faculty.department &&
        c.faculty.faculty === course.faculty.faculty
    );
    // 重複があれば更新、なければ新規保存
    if (duplicate) {
      const id = Number.parseInt(String(duplicate.courseId), 10);
      if (Number.isNaN(id)) {
        throw new Error(`Invalid duplicate.courseId: ${duplicate.courseId}`);
      }
      const { courseId, ...courseWithoutId } = course;
      const updateCourseResponse = await fetch(
        `${this.apiBaseUrl}/courses/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(courseWithoutId),
        },
      );
      const body = await updateCourseResponse.text();
      if (!updateCourseResponse.ok) {
        throw new Error(
          `Error updating course: ${updateCourseResponse.status} ${updateCourseResponse.statusText} ${body}`
        );
      }
      return;
    }

    // 新規講義情報の保存
    const { courseId, ...courseData } = course;
    const response = await fetch(`${this.apiBaseUrl}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courses: [courseData],
      }),
    });
    const body = await response.text();
    if (!response.ok) {
      const { courseDescription, ...courseForErrorMessage } = course;
      throw new Error(
        `Error saving course: ${JSON.stringify(courseForErrorMessage, null, 2)} ${
          response.status
        } ${response.statusText} ${body}`
      );
    }
  }

  async deleteCourse(id: string): Promise<void> {
    const intId = Number.parseInt(id, 10);
    const response = await fetch(`${this.apiBaseUrl}/courses/${intId}`, {
      method: "DELETE",
    });
    const body = await response.text();
    if (!response.ok) {
      throw new Error(
        `Error deleting course: ${response.status} ${response.statusText} ${body}`
      );
    }
  }
}
