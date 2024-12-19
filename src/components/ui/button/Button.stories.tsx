import type { Meta, StoryObj } from "@storybook/react";

import { House } from "lucide-react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: (
      <>
        <House />
        Click me
      </>
    ),
    disabled: false,
    loading: false,
  },
};
