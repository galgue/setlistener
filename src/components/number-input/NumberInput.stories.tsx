import type { Meta, StoryObj } from "@storybook/react";

import { NumberInput } from "./NumberInput";

const meta = {
  title: "component/NumberInput",
  component: NumberInput,
  parameters: {
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const input: Story = {
  args: {
    label: "Number Input",
    value: 0,
  },
  render: (args) => (
    <div className="w-[150px]">
      <NumberInput {...args} />
    </div>
  ),
};
