import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ApplicantsBar from "./ApplicantsBar";
import type { LotteryCourseStatus } from "@/types/lotteryCourse";

const mockLecture: LotteryCourseStatus = {
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
};

const underCapacityLecture: LotteryCourseStatus = {
  ...mockLecture,
  title: "定員以下の講義",
  capacity: 50,
  applicants: {
    all: 25,
    primary: 3,
    first: 12,
    second: 5,
    third: 3,
    fourth: 2,
    fifth: 0,
  },
};

const meta: Meta<typeof ApplicantsBar> = {
  component: ApplicantsBar,
  title: "Components/ApplicantsBar",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof ApplicantsBar>;

export const CapacityMode: Story = {
  args: {
    lecture: mockLecture,
    base: "capacity",
  },
};

export const AllApplicantsMode: Story = {
  args: {
    lecture: mockLecture,
    base: "allApplicants",
  },
};

export const AllApplicantsUnderCapacity: Story = {
  args: {
    lecture: underCapacityLecture,
    base: "allApplicants",
  },
};

export const CapacityModeUnderCapacity: Story = {
  args: {
    lecture: underCapacityLecture,
    base: "capacity",
  },
};
