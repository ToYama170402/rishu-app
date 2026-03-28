import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DetailPopup from "./DetailPopup";
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

const noApplicantsLecture: LotteryCourseStatus = {
  ...mockLecture,
  title: "志望者なし講義",
  applicants: {
    all: 0,
    primary: 0,
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
    fifth: 0,
  },
};

const meta: Meta<typeof DetailPopup> = {
  component: DetailPopup,
  title: "Features/DetailPopup",
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DetailPopup>;

export const Open: Story = {
  args: {
    lecture: mockLecture,
    open: true,
    onClose: () => {},
  },
};

export const NoApplicants: Story = {
  args: {
    lecture: noApplicantsLecture,
    open: true,
    onClose: () => {},
  },
};
