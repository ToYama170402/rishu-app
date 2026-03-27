import type { StorybookConfig } from "@storybook/nextjs-vite";

  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
    "@storybook/addon-vitest"
  ],
  framework: "@storybook/nextjs-vite",
  staticDirs: ["../public"],
};
export default config;
