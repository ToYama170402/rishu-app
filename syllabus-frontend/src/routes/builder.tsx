import { Separator } from "@/components/ui/separator";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Checkbox,
  CheckboxControl,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import createSet from "@/signals/createSet";
import { Course } from "@/type/course";
import getCourses from "@/utils/getCourses";
import { createResource, For, Match, Switch } from "solid-js";
import { VsFilter } from "solid-icons/vs";

export default function Builder() {
  const [courses] = createResource(getCourses);
  const {
    set: takenCourses,
    add: addTakenCourse,
    remove: removeTakenCourse,
  } = createSet<Course>([]);
  const {
    set: semesterFilters,
    add: addSemesterFilter,
    remove: removeSemesterFilter,
  } = createSet<number>(
    courses()
      ?.map((course) => course.semester)
      .flat()
  );
  const {
    set: facultyFilters,
    add: addFacultyFilter,
    remove: removeFacultyFilter,
  } = createSet<Course["faculty"]["faculty"]>(
    courses()?.map((course) => course.faculty.faculty)
  );

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
          <DialogContent class="sm:max-w-[425px] bg-white">
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
                        class="mx-auto bg-gray-800 text-gray-50"
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
