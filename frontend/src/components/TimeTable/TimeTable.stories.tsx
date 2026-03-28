import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TimeTable, {
  type RenderCellProps,
  type RenderColumnProps,
} from "./TimeTable";

/** ストーリー用のサンプルデータ型 */
type SampleItem = {
  day: string;
  period: number;
  title: string;
};

/** サンプルデータ */
const sampleData: SampleItem[] = [
  { day: "月", period: 1, title: "数学" },
  { day: "月", period: 2, title: "英語" },
  { day: "火", period: 1, title: "物理" },
  { day: "火", period: 3, title: "化学" },
  { day: "水", period: 2, title: "体育" },
  { day: "木", period: 4, title: "国語" },
  { day: "金", period: 5, title: "歴史" },
];

/** セルのレンダリングコンポーネント */
function SampleCell({
  yFragment,
  dataFragment,
}: RenderCellProps<SampleItem>) {
  return (
    <div className="h-12 border border-gray-200 px-1 py-0.5 text-xs">
      <div className="text-gray-400 text-[10px]">{String(yFragment)}限</div>
      {dataFragment.length > 0 ? (
        <ul>
          {dataFragment.map((item) => (
            <li key={item.title} className="truncate text-blue-700">
              {item.title}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** 列コンテナのレンダリングコンポーネント */
function SampleColumn({ xFragment, children }: RenderColumnProps) {
  return (
    <div className="flex flex-col w-20 border border-gray-300 rounded">
      <div className="text-center font-bold bg-gray-100 py-0.5 text-sm">
        {String(xFragment)}
      </div>
      {children}
    </div>
  );
}

/** 全体コンテナのレンダリングコンポーネント */
function SampleContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto p-2 bg-white rounded shadow">
      {children}
    </div>
  );
}

const meta: Meta<typeof TimeTable<SampleItem>> = {
  title: "Components/TimeTable",
  component: TimeTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof TimeTable<SampleItem>>;

export const Default: Story = {
  args: {
    data: sampleData,
    xArray: ["月", "火", "水", "木", "金"],
    yArray: [1, 2, 3, 4, 5],
    xKey: "day",
    yKey: "period",
    RenderCell: SampleCell,
    RenderColumn: SampleColumn,
    TimeTableContainer: SampleContainer,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    data: [],
  },
};

export const WithWeekend: Story = {
  args: {
    ...Default.args,
    xArray: ["月", "火", "水", "木", "金", "土"],
    data: [
      ...sampleData,
      { day: "土", period: 1, title: "特別講座" },
    ],
  },
};
