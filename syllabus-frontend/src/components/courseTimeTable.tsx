import TimeTable from "@/components/timeTable";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Course } from "@/type/course";
import { Faculty, facultyMap } from "@/type/department";
import { Semester } from "@/type/semester";
import { VsFilter } from "solid-icons/vs";
import { For, Show } from "solid-js";
import createSet from "@/signals/createSet";
import { cn } from "@/libs/cn";
import { buttonVariants } from "@/components/ui/button";

type props = {
  courses: () => Course[];
  class?: string;
};

export default function CourseTimeTable({ courses, class: className }: props) {
  const columnElements = [1, 2, 3, 4, 5];
  const schoolQuarters = [1, 2, 3, 4];

  const {
    set: facultyFilter,
    add: addFacultyFilter,
    remove: removeFacultyFilter,
  } = createSet<Faculty["faculty"]>(Object.values(facultyMap).flat());

  return (
    <Tabs class={cn("h-full w-full", className)} defaultValue="1">
      <div class="flex justify-between px-1 ">
        <TabsList class="gap-1 w-fit">
          <For each={schoolQuarters}>
            {(quarter) => (
              <TabsTrigger value={quarter.toString()}>{quarter}Q</TabsTrigger>
            )}
          </For>
        </TabsList>
        <Dialog>
          <DialogTrigger>
            <VsFilter />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>フィルター</DialogTitle>
              <DialogDescription>
                <div class="grid grid-cols-2 gap-x-4 gap-y-0 max-h-[60vh] overflow-y-auto">
                  <For each={Object.entries(facultyMap)}>
                    {([key, faculty]) => (
                      <div>
                        <h3 class="font-bold">{key}</h3>
                        <div class="mb-2">
                          <For each={faculty}>
                            {(f) => (
                              <div>
                                <Checkbox
                                  class="flex"
                                  onChange={(e) => {
                                    if (e) {
                                      addFacultyFilter(f);
                                    } else {
                                      removeFacultyFilter(f);
                                    }
                                  }}
                                  checked={facultyFilter().has(f)}
                                >
                                  <CheckboxControl />
                                  <CheckboxLabel>{f}</CheckboxLabel>
                                </Checkbox>
                              </div>
                            )}
                          </For>
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <For each={schoolQuarters}>
        {(quarter) => (
          <TabsContent
            value={quarter.toString()}
            class="h-[calc(100%-44px)] data-[orientation=horizontal]:mt-0"
          >
            <TimeTable
              class="flex justify-around h-full w-full p-1 pt-0 overflow-x-auto snap-x scroll-smooth"
              datum={() =>
                courses()?.filter(
                  (course) =>
                    course.semester.includes(quarter as Semester) &&
                    facultyFilter().has(course.faculty.faculty)
                ) || []
              }
              rowElements={["月", "火", "水", "木", "金"]}
              columnElements={columnElements}
              cellGetter={(datum, row, col) => () =>
                datum().filter((d) =>
                  d.schedules.some((s) => s.day === row && s.period === col)
                )}
              rowRenderer={({ row, children }) => (
                <Card class="mx-[2px] w-[calc(100%-2px)] xl:w-[calc(20%-4px)] lg:w-[calc(33.3333%-2px)] md:w-[calc(50%-2px)] sm:w-[calc(100%-2px)] h-full overflow-hidden shrink-0 grow-0 p-1 snap-start scroll-ml-[4px]">
                  <CardHeader class="text-center p-0 h-[20px]">
                    {row}
                  </CardHeader>
                  <CardContent class="h-[calc(100%-20px)] p-2">
                    {children}
                  </CardContent>
                </Card>
              )}
              cellRenderer={({ data, col }) => (
                <>
                  <div class="h-1/5 py-1">
                    <div class="h-full overflow-y-auto snap-y scroll-smooth">
                      <ul>
                        <For each={data()}>
                          {(item) => (
                            <li class="list-none text-nowrap text-ellipsis overflow-clip snap-start">
                              <Dialog>
                                <DialogTrigger>
                                  {item.title} | {item.faculty.faculty}
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>
                                      {item.title} | {item.faculty.faculty}
                                    </DialogTitle>
                                    <DialogDescription>
                                      <p>
                                        {item.instructors
                                          .map((inst) => inst.name)
                                          .join(", ")}
                                      </p>
                                      <Separator class="my-2" />
                                      <p>単位: {item.numberOfCredits} 単位</p>
                                      <p>講義番号: {item.courseNumber}</p>
                                      <p>
                                        開講学期:{" "}
                                        {item.semester
                                          .map((semester) => `${semester}Q`)
                                          .join(", ")}
                                      </p>
                                      <p>講義室： {item.lectureRoomInfo}</p>
                                      <Separator class="my-2" />
                                      <For each={item.schedules}>
                                        {(s) => (
                                          <p>
                                            {s.day}曜日 {s.period}限目
                                          </p>
                                        )}
                                      </For>
                                      <Separator class="my-2" />
                                      <a
                                        href={`https://eduweb.sta.kanazawa-u.ac.jp${item.japaneseUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class={cn(buttonVariants())}
                                      >
                                        シラバス
                                      </a>
                                    </DialogDescription>
                                  </DialogHeader>
                                </DialogContent>
                              </Dialog>
                            </li>
                          )}
                        </For>
                      </ul>
                    </div>
                  </div>
                  <Show when={col !== columnElements.at(-1)}>
                    <Separator />
                  </Show>
                </>
              )}
            />
          </TabsContent>
        )}
      </For>
    </Tabs>
  );
}
