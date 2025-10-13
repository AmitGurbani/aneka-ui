import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "@/components/material/button";

const meta: Meta<typeof Button> = {
  title: "Material Design 3/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "filled",
        "filled-tonal",
        "elevated",
        "outlined",
        "text",
        "destructive",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Filled: Story = {
  args: {
    children: "Filled Button",
  },
};

export const FilledTonal: Story = {
  args: {
    variant: "filled-tonal",
    children: "Filled Tonal",
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    children: "Elevated",
  },
};

export const Outlined: Story = {
  args: {
    variant: "outlined",
    children: "Outlined",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    children: "Text Button",
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Destructive",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Small",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
    children: "Large",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};
