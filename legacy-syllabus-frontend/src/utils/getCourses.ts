import { Course } from "@/type/course";

const getCourses = async () => {
  const isServer = typeof window === "undefined";
  const apiEndpoint = isServer
    ? "http://syllabus-backend:8080/courses"
    : "http://localhost:8080/courses";

  const courses = await fetch(apiEndpoint)
    .then((res) => res.json())
    .catch((err) => {
      console.error("Error fetching courses:", err);
      return [];
    });
  return courses as Course[];
};
export default getCourses;
