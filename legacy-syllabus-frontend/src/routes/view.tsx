import CourseTimeTable from "@/components/courseTimeTable";
import getCourses from "@/utils/getCourses";
import { createResource } from "solid-js";

export default function Home() {
  const [courses] = createResource(getCourses);

  return <CourseTimeTable courses={() => courses() || []} />;
}
