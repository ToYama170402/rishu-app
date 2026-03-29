import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import HelpDialog from "./HelpDialog";

const meta: Meta<typeof HelpDialog> = {
  component: HelpDialog,
  title: "Components/HelpDialog",
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof HelpDialog>;

/** ダイアログが開いた状態 */
export const Open: Story = {
  args: {
    open: true,
    setOpen: () => {},
  },
};

/** ダイアログが閉じた状態 */
export const Closed: Story = {
  args: {
    open: false,
    setOpen: () => {},
  },
};
