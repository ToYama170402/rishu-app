import CourseTimeTable from "@/components/courseTimeTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Checkbox,
  CheckboxControl,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { createLocalStorageSignal } from "@/signals/createLocalStorage";
import createSet from "@/signals/createSet";
import { Course } from "@/type/course";
import { Semester } from "@/type/semester";
import getCourses from "@/utils/getCourses";
import { VsFilter } from "solid-icons/vs";
import { createEffect, createResource, For, Match, Switch } from "solid-js";

export default function Builder() {
  const [courses] = createResource(getCourses);
  const {
    set: takenCourses,
    add: addTakenCourse,
    remove: removeTakenCourse,
  } = createSet<Course>([]);

  const [storedTakenCourses, setStoredTakenCourses] = createLocalStorageSignal<
    Course[]
  >("takenCourses", []);

  createEffect(() => {
    if (storedTakenCourses().length && takenCourses().size === 0) {
      storedTakenCourses().forEach((course) => addTakenCourse(course));
    }
    setStoredTakenCourses(Array.from(takenCourses().values()));
  });

  const {
    set: semesterFilters,
    add: addSemesterFilter,
    remove: removeSemesterFilter,
  } = createSet<Semester>([]);
  const {
    set: facultyFilters,
    add: addFacultyFilter,
    remove: removeFacultyFilter,
  } = createSet<Course["faculty"]["faculty"]>([]);

  createEffect(() => {
    const c = courses();
    if (c) {
      c.map((course) => course.semester)
        .flat()
        .filter((s, i, arr) => arr.indexOf(s) === i)
        .forEach((s) => addSemesterFilter(s));
      c.map((course) => course.faculty.faculty)
        .filter((f, i, arr) => arr.indexOf(f) === i)
        .forEach((f) => addFacultyFilter(f));
    }
  });

  return (
    <div class="flex h-full">
      <CourseTimeTable
        class="w-2/3"
        courses={() =>
          takenCourses().size ? Array.from(takenCourses().values()) : []
        }
      />
      <div class="h-full p-2 w-1/3">
        <Dialog>
          <DialogTrigger>
            <VsFilter />
          </DialogTrigger>
          <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>講義追加フィルター</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <For
                each={courses()
                  ?.map((c) => c.semester)
                  .flat()
                  .filter((s, i, arr) => arr.indexOf(s) === i)
                  .sort()}
              >
                {(semester) => (
                  <Checkbox
                    class="flex"
                    onChange={(e) => {
                      if (e.valueOf()) {
                        addSemesterFilter(semester);
                      } else {
                        removeSemesterFilter(semester);
                      }
                    }}
                    checked={semesterFilters().has(semester)}
                    defaultChecked={true}
                  >
                    <CheckboxControl />
                    <CheckboxLabel>
                      <span> {semester}Q</span>
                    </CheckboxLabel>
                  </Checkbox>
                )}
              </For>
              <Separator />
              <For
                each={courses()
                  ?.map((c) => c.faculty.faculty)
                  .filter((f, i, arr) => arr.indexOf(f) === i)
                  .sort((a, b) => a.localeCompare(b))}
              >
                {(f) => (
                  <Checkbox
                    class="flex"
                    onChange={(e) => {
                      if (e.valueOf()) {
                        addFacultyFilter(f);
                      } else {
                        removeFacultyFilter(f);
                      }
                    }}
                    checked={facultyFilters().has(f)}
                    defaultChecked={true}
                  >
                    <CheckboxControl />
                    <CheckboxLabel>
                      <span> {f}</span>
                    </CheckboxLabel>
                  </Checkbox>
                )}
              </For>
            </DialogDescription>
          </DialogContent>
        </Dialog>
        <div class="overflow-y-auto flex flex-col gap-2 h-[calc(100%-44px)] mt-1">
          <For
            each={courses()
              ?.filter((course) => {
                if (
                  course.semester.some((sem) => semesterFilters().has(sem)) &&
                  facultyFilters().has(course.faculty.faculty)
                )
                  return true;
                return false;
              })
              .sort((a, b) => a.courseNumber.localeCompare(b.courseNumber))}
          >
            {(course) => (
              <Card class="flex justify-between gap-1 p-3">
                <CardHeader class="w-4/5 p-0">
                  <CardTitle class="overflow-hidden text-ellipsis whitespace-nowrap">
                    {course.title}
                  </CardTitle>
                  <CardDescription class="flex justify-between">
                    <div class="flex justify-between gap-2">
                      <p>{course.semester.map((sem) => sem + "Q").join(" ")}</p>
                      <p>{course.courseNumber}</p>
                    </div>
                    <p>
                      {course.schedules
                        .map(
                          (schedule) =>
                            `${schedule.day}${
                              schedule.day === "集中" ? "" : schedule.period
                            }`
                        )
                        .join(" ")}
                    </p>
                  </CardDescription>
                </CardHeader>
                <CardContent class="w-1/5 p-0 flex items-center">
                  <Switch>
                    <Match when={takenCourses().has(course)}>
                      <Button
                        variant={"destructive"}
                        class="mx-auto"
                        onclick={() => removeTakenCourse(course)}
                      >
                        削除
                      </Button>
                    </Match>
                    <Match when={!takenCourses().has(course)}>
                      <Button
                        class="mx-auto"
                        onclick={() => addTakenCourse(course)}
                      >
                        追加
                      </Button>
                    </Match>
                  </Switch>
                </CardContent>
              </Card>
            )}
          </For>
        </div>
      </div>
    </div>
  );
}
