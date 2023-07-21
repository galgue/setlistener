import { twMerge } from "tailwind-merge";

const variants = {
  primary: "border-gray-300 bg-gray-50 p-2.5 text-center text-gray-900",
};

type InputProps = {
  variant?: keyof typeof variants;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = (inputProps: InputProps) => {
  return (
    <input
      {...inputProps}
      className={twMerge(
        "rounded-lg border p-2.5",
        variants[inputProps.variant ?? "primary"],
        inputProps.className
      )}
    />
  );
};
