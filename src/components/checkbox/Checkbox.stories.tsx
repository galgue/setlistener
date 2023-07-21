import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "component/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    variant: { defaultValue: "primary" },
    className: { type: "string", defaultValue: "w-1/2" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    variant: "primary",
    className: "w-[150px]",
  },
};

export const CheckboxWithLabel: Story = {
  args: {
    id: "checkbox-id",
    variant: "primary",
  },
  render: (args) => (
    <div className="flex flex-row gap-2">
      <Checkbox {...args} />
      <label about={args.id}>label</label>
    </div>
  ),
};
