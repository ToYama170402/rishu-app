import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import TimeTable, {
  type RowRendererProps,
  type CellRendererProps,
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
function SampleCell({ data, col }: CellRendererProps<SampleItem[], string>) {
  return (
    <div className="h-12 border border-gray-200 px-1 py-0.5 text-xs">
      <div className="text-gray-400 text-[10px]">{String(col)}限</div>
      {data.length > 0 ? (
        <ul>
          {data.map((item) => (
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
function SampleColumn({ row, children }: RowRendererProps<number>) {
  return (
    <div className="flex flex-col w-20 border border-gray-300 rounded">
      <div className="text-center font-bold bg-gray-100 py-0.5 text-sm">
        {String(row)}
      </div>
      {children}
    </div>
  );
}

const meta: Meta<typeof TimeTable<SampleItem, number, string, SampleItem[]>> = {
  title: "Components/TimeTable",
  component: TimeTable,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<
  typeof TimeTable<SampleItem[], number, string, SampleItem[]>
>;

export const Default: Story = {
  args: {
    datum: sampleData,
    rowElements: [1, 2, 3, 4, 5],
    columnElements: ["月", "火", "水", "木", "金"],
    cellGetter: (data, row, col) =>
      data.filter((item) => item.period === row && item.day === col),
    rowRenderer: SampleColumn,
    cellRenderer: SampleCell,
    className: "flex gap-2",
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    datum: [],
  },
};

export const WithWeekend: Story = {
  args: {
    ...Default.args,
    columnElements: ["月", "火", "水", "木", "金", "土"],
    datum: [...sampleData, { day: "土", period: 1, title: "特別講座" }],
  },
};
