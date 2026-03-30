import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import CourseTimeTable from "./CourseTimeTable";
import { type Course } from "@/types/course";

/** ストーリー用のサンプル科目データ */
const sampleCourses: Course[] = [
  {
    courseId: "1",
    year: 2024,
    title: "微分積分学",
    numbering: "MA101",
    courseNumber: "1001",
    numberOfProper: null,
    semester: [1, 2],
    numberOfCredits: 2,
    note: "",
    englishUrl: "",
    japaneseUrl: "/syllabus/1001",
    keywords: ["数学", "微積分"],
    openAccount: "",
    max60CreditsFlag: "",
    subjectDistinguished: "",
    courseDescription: "微分積分の基礎を学ぶ",
    instructors: [{ name: "山田 太郎" }],
    schedules: [{ day: "月", period: 1 }],
    classFormat: "講義",
    lectureForm: "対面",
    targetStudents: "1年生",
    lectureRoomInfo: "自然科学大講義室",
    faculty: { department: "理工学域", faculty: "数物科学類" },
  },
  {
    courseId: "2",
    year: 2024,
    title: "英語コミュニケーション",
    numbering: "EN101",
    courseNumber: "1002",
    numberOfProper: 30,
    semester: [1],
    numberOfCredits: 1,
    note: "",
    englishUrl: "",
    japaneseUrl: "/syllabus/1002",
    keywords: ["英語"],
    openAccount: "",
    max60CreditsFlag: "",
    subjectDistinguished: "",
    courseDescription: "英語の基礎コミュニケーション",
    instructors: [{ name: "Smith John" }],
    schedules: [{ day: "火", period: 2 }],
    classFormat: "演習",
    lectureForm: "対面",
    targetStudents: "全学年",
    lectureRoomInfo: "外国語センター101",
    faculty: { department: "人間社会学域", faculty: "国際学類" },
  },
  {
    courseId: "3",
    year: 2024,
    title: "プログラミング基礎",
    numbering: "CS101",
    courseNumber: "1003",
    numberOfProper: null,
    semester: [1, 2, 3, 4],
    numberOfCredits: 2,
    note: "",
    englishUrl: "",
    japaneseUrl: "/syllabus/1003",
    keywords: ["プログラミング", "情報"],
    openAccount: "",
    max60CreditsFlag: "",
    subjectDistinguished: "",
    courseDescription: "プログラミングの基礎を学ぶ",
    instructors: [{ name: "佐藤 次郎" }],
    schedules: [
      { day: "水", period: 3 },
      { day: "木", period: 3 },
    ],
    classFormat: "講義・演習",
    lectureForm: "対面",
    targetStudents: "1年生",
    lectureRoomInfo: "情報処理演習室A",
    faculty: { department: "理工学域", faculty: "電子情報通信学類" },
  },
  {
    courseId: "4",
    year: 2024,
    title: "経済学入門",
    numbering: "EC101",
    courseNumber: "1004",
    numberOfProper: null,
    semester: [3, 4],
    numberOfCredits: 2,
    note: "",
    englishUrl: "",
    japaneseUrl: "/syllabus/1004",
    keywords: ["経済"],
    openAccount: "",
    max60CreditsFlag: "",
    subjectDistinguished: "",
    courseDescription: "経済学の基礎概念を学ぶ",
    instructors: [{ name: "田中 花子" }],
    schedules: [{ day: "金", period: 4 }],
    classFormat: "講義",
    lectureForm: "対面",
    targetStudents: "全学年",
    lectureRoomInfo: "社会科学棟201",
    faculty: { department: "人間社会学域", faculty: "経済学類" },
  },
  {
    courseId: "5",
    year: 2024,
    title: "医学概論",
    numbering: "MD101",
    courseNumber: "1005",
    numberOfProper: null,
    semester: [1],
    numberOfCredits: 1,
    note: "",
    englishUrl: "",
    japaneseUrl: "/syllabus/1005",
    keywords: ["医学"],
    openAccount: "",
    max60CreditsFlag: "",
    subjectDistinguished: "",
    courseDescription: "医学の概論",
    instructors: [{ name: "鈴木 一郎" }],
    schedules: [{ day: "月", period: 5 }],
    classFormat: "講義",
    lectureForm: "対面",
    targetStudents: "医学類1年生",
    lectureRoomInfo: "宝町キャンパス大講義室",
    faculty: { department: "医薬保健学域", faculty: "医学類" },
  },
];

const meta: Meta<typeof CourseTimeTable> = {
  title: "Components/CourseTimeTable",
  component: CourseTimeTable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof CourseTimeTable>;

export const Default: Story = {
  args: {
    courses: sampleCourses,
    className: "h-[600px]",
  },
};

export const Empty: Story = {
  args: {
    courses: [],
    className: "h-[600px]",
  },
};

export const SingleQuarterOnly: Story = {
  args: {
    courses: sampleCourses.filter((c) => c.semester.includes(1)),
    className: "h-[600px]",
  },
};
