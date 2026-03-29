"use client";

import { useEffect, useMemo, useState } from "react";
import { FilterIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { type Course } from "@/types/course";
import { type Semester } from "@/types/semester";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import CourseTimeTable from "@/components/CourseTimeTable/CourseTimeTable";

/** 集中講義を表す曜日の値 */
const INTENSIVE_DAY = "集中" as const;
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type BuilderClientProps = {
  courses: Course[];
  className?: string;
};

/**
 * `/builder` ページのクライアント側インタラクション。
 *
 * - サイドバーで授業を追加／削除
 * - 選択済みコースIDを `localStorage` で永続化
 * - 学期・学類フィルタ
 * - 左側の時間割に選択済みコースを表示
 */
export default function BuilderClient({ courses, className }: BuilderClientProps) {
  // localStorage に保存する選択済みコースID一覧
  const [storedIds, setStoredIds] = useLocalStorage<string[]>("takenCourseIds", []);

  // 選択済みコースID の Set（UI 操作に使う）
  const [takenIds, setTakenIds] = useState<Set<string>>(
    () => new Set(storedIds),
  );

  // takenIds が変わるたびに localStorage を更新
  useEffect(() => {
    setStoredIds(Array.from(takenIds));
  }, [takenIds]); // eslint-disable-line react-hooks/exhaustive-deps

  // 選択済みコースオブジェクト（時間割表示用）
  const takenCourses = useMemo(
    () => courses.filter((c) => takenIds.has(c.courseId)),
    [courses, takenIds],
  );

  // ---- フィルタ ----

  // 全コースから重複排除した学期一覧
  const allSemesters = useMemo<Semester[]>(
    () =>
      [...new Set(courses.flatMap((c) => c.semester))].sort() as Semester[],
    [courses],
  );

  // 全コースから重複排除した学類一覧
  const allFaculties = useMemo(
    () =>
      [...new Set(courses.map((c) => c.faculty.faculty))].sort((a, b) =>
        a.localeCompare(b),
      ),
    [courses],
  );

  // 有効な学期フィルタ（初期値: 全選択）
  const [semesterFilters, setSemesterFilters] = useState<Set<Semester>>(
    () => new Set(allSemesters),
  );

  // 有効な学類フィルタ（初期値: 全選択）
  const [facultyFilters, setFacultyFilters] = useState<
    Set<Course["faculty"]["faculty"]>
  >(() => new Set(allFaculties));

  function toggleSemester(semester: Semester, checked: boolean) {
    setSemesterFilters((prev) => {
      const next = new Set(prev);
      if (checked) next.add(semester);
      else next.delete(semester);
      return next;
    });
  }

  function toggleFaculty(faculty: Course["faculty"]["faculty"], checked: boolean) {
    setFacultyFilters((prev) => {
      const next = new Set(prev);
      if (checked) next.add(faculty);
      else next.delete(faculty);
      return next;
    });
  }

  // フィルタ済みコース一覧
  const filteredCourses = useMemo(
    () =>
      courses
        .filter(
          (course) =>
            course.semester.some((s) => semesterFilters.has(s)) &&
            facultyFilters.has(course.faculty.faculty),
        )
        .sort((a, b) => a.courseNumber.localeCompare(b.courseNumber)),
    [courses, semesterFilters, facultyFilters],
  );

  function addCourse(course: Course) {
    setTakenIds((prev) => new Set([...prev, course.courseId]));
  }

  function removeCourse(course: Course) {
    setTakenIds((prev) => {
      const next = new Set(prev);
      next.delete(course.courseId);
      return next;
    });
  }

  return (
    <div className={cn("flex h-full overflow-hidden", className)}>
      {/* 左側: 選択済みコースの時間割 */}
      <CourseTimeTable courses={takenCourses} className="w-2/3" />

      {/* 右側: コース一覧サイドバー */}
      <div className="h-full p-2 w-1/3 flex flex-col">
        {/* フィルタダイアログ */}
        <Dialog>
          <DialogTrigger
            className="flex items-center gap-1 rounded px-2 py-1 text-sm hover:bg-accent w-fit"
            aria-label="フィルターを開く"
          >
            <FilterIcon className="size-4" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>講義追加フィルター</DialogTitle>
            </DialogHeader>
            <DialogDescription asChild>
              <div className="max-h-[60vh] overflow-y-auto space-y-2">
                {/* 学期フィルタ */}
                <div>
                  <h3 className="font-bold text-sm mb-1">学期</h3>
                  {allSemesters.map((semester) => (
                    <label
                      key={semester}
                      className="flex items-center gap-2 text-sm cursor-pointer mb-1"
                    >
                      <Checkbox
                        checked={semesterFilters.has(semester)}
                        onCheckedChange={(checked) =>
                          toggleSemester(semester, checked === true)
                        }
                      />
                      {semester}Q
                    </label>
                  ))}
                </div>
                <Separator />
                {/* 学類フィルタ */}
                <div>
                  <h3 className="font-bold text-sm mb-1">学類</h3>
                  {allFaculties.map((faculty) => (
                    <label
                      key={faculty}
                      className="flex items-center gap-2 text-sm cursor-pointer mb-1"
                    >
                      <Checkbox
                        checked={facultyFilters.has(faculty)}
                        onCheckedChange={(checked) =>
                          toggleFaculty(faculty, checked === true)
                        }
                      />
                      {faculty}
                    </label>
                  ))}
                </div>
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>

        {/* コース一覧 */}
        <div className="overflow-y-auto flex flex-col gap-2 flex-1 mt-1">
          {filteredCourses.map((course) => {
            const isTaken = takenIds.has(course.courseId);
            return (
              <Card
                key={course.courseId}
                className="flex justify-between gap-1 py-3 px-3"
              >
                <CardHeader className="w-4/5 p-0">
                  <CardTitle className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="flex justify-between text-xs">
                    <div className="flex gap-2">
                      <span>{course.semester.map((s) => `${s}Q`).join(" ")}</span>
                      <span>{course.courseNumber}</span>
                    </div>
                    <span>
                      {course.schedules
                        .map(
                          (s) =>
                            `${s.day}${s.day === INTENSIVE_DAY ? "" : s.period}`,
                        )
                        .join(" ")}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="w-1/5 p-0 flex items-center">
                  {isTaken ? (
                    <button
                      onClick={() => removeCourse(course)}
                      className="mx-auto rounded-md bg-destructive px-3 py-1 text-xs text-destructive-foreground hover:bg-destructive/90"
                    >
                      削除
                    </button>
                  ) : (
                    <button
                      onClick={() => addCourse(course)}
                      className="mx-auto rounded-md bg-primary px-3 py-1 text-xs text-primary-foreground hover:bg-primary/90"
                    >
                      追加
                    </button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
