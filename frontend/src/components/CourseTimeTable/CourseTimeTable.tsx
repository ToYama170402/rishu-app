"use client";

import React, { useState } from "react";
import { FilterIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { type Course } from "@/types/course";
import { type Faculty, type FacultyName, facultyMap } from "@/types/department";
import { type Semester } from "@/types/semester";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type CourseTimeTableProps = {
  courses: Course[];
  className?: string;
};

/** 表示する時限の配列（1〜5限） */
const PERIODS = [1, 2, 3, 4, 5] as const;

/** 表示する曜日の配列（月〜金） */
const DAYS = ["月", "火", "水", "木", "金"] as const;

/** 表示する学期の配列（1Q〜4Q） */
const QUARTERS: Semester[] = [1, 2, 3, 4];

/**
 * シラバス科目の時間割コンポーネント。
 *
 * - 学期（1Q〜4Q）のタブ切替
 * - 学類フィルタダイアログ
 * - 各セルに科目一覧を表示（クリックで詳細ダイアログ）
 * - DayPeriod 型を使用
 */
export default function CourseTimeTable({
  courses,
  className,
}: CourseTimeTableProps) {
  const allFaculties = Object.values(facultyMap).flat() as FacultyName[];

  /** 選択中の学類セット（初期値: 全選択） */
  const [selectedFaculties, setSelectedFaculties] = useState<Set<FacultyName>>(
    new Set(allFaculties),
  );

  function toggleFaculty(faculty: FacultyName, checked: boolean) {
    setSelectedFaculties((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(faculty);
      } else {
        next.delete(faculty);
      }
      return next;
    });
  }

  return (
    <Tabs defaultValue="1" className={cn("h-full w-full", className)}>
      {/* タブヘッダーとフィルタボタン */}
      <div className="flex justify-between px-1">
        <TabsList className="gap-1 w-fit">
          {QUARTERS.map((quarter) => (
            <TabsTrigger key={quarter} value={String(quarter)}>
              {quarter}Q
            </TabsTrigger>
          ))}
        </TabsList>

        {/* 学類フィルタダイアログ */}
        <Dialog>
          <DialogTrigger
            className="flex items-center gap-1 rounded px-2 py-1 text-sm hover:bg-accent"
            aria-label="学類フィルターを開く"
          >
            <FilterIcon className="size-4" />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>フィルター</DialogTitle>
              <DialogDescription>
                表示する学類を選択してください。
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-x-4 gap-y-0 max-h-[60vh] overflow-y-auto">
              {(
                Object.entries(facultyMap) as [
                  keyof typeof facultyMap,
                  readonly FacultyName[],
                ][]
              ).map(([department, faculties]) => (
                <div key={department}>
                  <h3 className="font-bold text-sm mb-1">{department}</h3>
                  <div className="mb-2 space-y-1">
                    {faculties.map((faculty) => (
                      <label
                        key={faculty}
                        className="flex items-center gap-2 text-sm cursor-pointer"
                      >
                        <Checkbox
                          checked={selectedFaculties.has(faculty)}
                          onCheckedChange={(checked) =>
                            toggleFaculty(faculty, checked === true)
                          }
                        />
                        {faculty}
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* 学期ごとのタブコンテンツ */}
      {QUARTERS.map((quarter) => {
        const filteredCourses = courses.filter(
          (course) =>
            course.semester.includes(quarter) &&
            selectedFaculties.has(course.faculty.faculty),
        );

        return (
          <TabsContent
            key={quarter}
            value={String(quarter)}
            className="h-[calc(100%-44px)] mt-0"
          >
            {/* 曜日ごとのカード列 */}
            <div className="flex justify-around h-full w-full p-1 pt-0 overflow-x-auto snap-x scroll-smooth">
              {DAYS.map((day) => (
                <Card
                  key={day}
                  className="mx-[2px] w-[calc(100%-2px)] xl:w-[calc(20%-4px)] lg:w-[calc(33.333%-4px)] md:w-[calc(50%-4px)] sm:w-[calc(100%-2px)] h-full overflow-hidden shrink-0 grow-0 py-1 px-0 snap-start scroll-ml-1"
                >
                  <CardHeader className="text-center p-0 h-[20px] font-bold text-sm">
                    {day}
                  </CardHeader>
                  <CardContent className="h-[calc(100%-20px)] p-2">
                    {PERIODS.map((period) => {
                      const cellCourses = filteredCourses.filter((course) =>
                        course.schedules.some(
                          (s) => s.day === day && s.period === period,
                        ),
                      );
                      const isLast = period === PERIODS[PERIODS.length - 1];

                      return (
                        <React.Fragment key={period}>
                          <div className="h-1/5 py-1">
                            <div className="h-full overflow-y-auto snap-y scroll-smooth">
                              <ul className="space-y-0.5">
                                {cellCourses.map((course) => (
                                  <CourseCell key={course.id} course={course} />
                                ))}
                              </ul>
                            </div>
                          </div>
                          {!isLast && <Separator />}
                        </React.Fragment>
                      );
                    })}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

type CourseCellProps = {
  course: Course;
};

/** 科目セルの1アイテム。クリックで詳細ダイアログを開く。 */
function CourseCell({ course }: CourseCellProps) {
  return (
    <li className="list-none text-nowrap text-ellipsis overflow-clip snap-start">
      <Dialog>
        <DialogTrigger className="text-left text-xs hover:underline truncate max-w-full">
          {course.title} | {(course.faculty as Faculty).faculty}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {course.title} | {(course.faculty as Faculty).faculty}
            </DialogTitle>
            <DialogDescription asChild>
              <div>
                <p className="text-sm">
                  {course.instructors.map((inst) => inst.name).join(", ")}
                </p>
                <Separator className="my-2" />
                <p className="text-sm">単位: {course.numberOfCredits} 単位</p>
                <p className="text-sm">講義番号: {course.courseNumber}</p>
                <p className="text-sm">
                  開講学期: {course.semester.map((s) => `${s}Q`).join(", ")}
                </p>
                <p className="text-sm">講義室: {course.lectureRoomInfo}</p>
                <Separator className="my-2" />
                {course.schedules.map((s, i) => (
                  <p key={i} className="text-sm">
                    {s.day === "集中"
                      ? "集中講義"
                      : `${s.day}曜日 ${s.period}限目`}
                  </p>
                ))}
                <Separator className="my-2" />
                <a
                  href={`https://eduweb.sta.kanazawa-u.ac.jp${course.japaneseUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  シラバス
                </a>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </li>
  );
}
