import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AppBar from "./AppBar";

const meta: Meta<typeof AppBar> = {
  component: AppBar,
  title: "Features/AppBar",
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AppBar>;

/** デフォルトのAppBar（デスクトップ幅） */
export const Default: Story = {};

/** モバイル幅でのAppBar表示 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

/** AppBarのchildrenにカスタムコンテンツを渡した例（モバイルドロワー内に表示される） */
export const WithChildren: Story = {
  args: {
    children: (
      <div className="text-sm text-primary-foreground/80">
        カスタムコンテンツ（フィルター等）
      </div>
    ),
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
