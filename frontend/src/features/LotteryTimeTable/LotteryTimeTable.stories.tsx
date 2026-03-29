import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import LotteryTimeTable from "./LotteryTimeTable";
import type { LotteryCourseStatus } from "@/types/lotteryCourse";

const mockLectures: LotteryCourseStatus[] = [
  {
    number: "G1001",
    category: "ＧＳ科目",
    title: "データサイエンス入門",
    dateTime: { day: "月", period: 1 },
    teacher: "山田　太郎",
    target: "全学部1年",
    capacity: 30,
    applicants: {
      all: 45,
      primary: 5,
      first: 20,
      second: 10,
      third: 8,
      fourth: 4,
      fifth: 3,
    },
  },
  {
    number: "G1002",
    category: "ＧＳ科目",
    title: "プログラミング基礎",
    dateTime: { day: "月", period: 2 },
    teacher: "鈴木　花子",
    target: "全学部1年",
    capacity: 40,
    applicants: {
      all: 25,
      primary: 2,
      first: 12,
      second: 6,
      third: 3,
      fourth: 2,
      fifth: 0,
    },
  },
  {
    number: "G1003",
    category: "ＧＳ言語科目",
    title: "英語コミュニケーションA",
    dateTime: { day: "火", period: 1 },
    teacher: "Smith John",
    target: "全学部1年",
    capacity: 20,
    applicants: {
      all: 35,
      primary: 3,
      first: 15,
      second: 8,
      third: 5,
      fourth: 3,
      fifth: 1,
    },
  },
  {
    number: "G1004",
    category: "自由履修科目",
    title: "哲学入門",
    dateTime: { day: "水", period: 3 },
    teacher: "中村　隆",
    target: "全学部",
    capacity: 50,
    applicants: {
      all: 20,
      primary: 1,
      first: 10,
      second: 5,
      third: 3,
      fourth: 1,
      fifth: 0,
    },
  },
  {
    number: "G1005",
    category: "ＧＳ科目",
    title: "集中特別講義",
    dateTime: { day: "集中", period: null },
    teacher: "高橋　健",
    target: "全学部",
    capacity: 15,
    applicants: {
      all: 10,
      primary: 0,
      first: 5,
      second: 3,
      third: 2,
      fourth: 0,
      fifth: 0,
    },
  },
];

const meta: Meta<typeof LotteryTimeTable> = {
  component: LotteryTimeTable,
  title: "Features/LotteryTimeTable",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof LotteryTimeTable>;

/** デフォルト表示（複数講義あり） */
export const Default: Story = {
  args: {
    initialLectures: mockLectures,
  },
};

/** 講義なし */
export const Empty: Story = {
  args: {
    initialLectures: [],
  },
};

/** 集中講義のみ */
export const IntensiveOnly: Story = {
  args: {
    initialLectures: [mockLectures[4]],
  },
};
