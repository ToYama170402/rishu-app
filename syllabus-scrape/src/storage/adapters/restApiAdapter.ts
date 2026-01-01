import type { Course } from "@/course";
import type { CourseRepositoryAdapter } from "../repositories";

export class RestApiCourseRepositoryAdapter implements CourseRepositoryAdapter {
  constructor(private apiBaseUrl: string) {}

  async findCourseById(id: string): Promise<Course | null> {
    const intId = Number.parseInt(id, 10);
    const response = await fetch(`${this.apiBaseUrl}/courses/${intId}`);
    if (response.ok) {
      return (await response.json()) as Course;
    } else if (response.status === 404) {
      return null;
    } else {
      throw new Error(
        `Error fetching course: ${response.status} ${response.statusText} ${await response.text()}`
      );
    }
  }

  async saveCourse(course: Course): Promise<void> {
    const response = await fetch(`${this.apiBaseUrl}/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courses: [course],
      }),
    });
    if (!response.ok) {
      throw new Error(
        `Error saving course: ${response.status} ${response.statusText} ${await response.text()}`
      );
    }
  }

  async deleteCourse(id: string): Promise<void> {
    const intId = Number.parseInt(id, 10);
    const response = await fetch(`${this.apiBaseUrl}/courses/${intId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(
        `Error deleting course: ${response.status} ${response.statusText} ${await response.text()}`
      );
    }
  }
}
