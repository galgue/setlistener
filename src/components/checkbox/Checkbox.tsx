import { twMerge } from "tailwind-merge";

const variants = {
  primary: "border-gray-300 bg-gray-100 text-blue-950 accent-spotify-green",
};

type CheckboxProps = {
  variant?: keyof typeof variants;
} & Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
>;

export const Checkbox = (checkboxProps: CheckboxProps) => (
  <input
    {...checkboxProps}
    type="checkbox"
    className={twMerge(
      "rounded",
      variants[checkboxProps.variant ?? "primary"],
      checkboxProps.className
    )}
  />
);
