import type { HTMLProps } from "react";
import { twMerge } from "tailwind-merge";

const variants = {
  primary: "bg-spotify-green  hover:bg-green-600",
  secondary: "bg-spotify-header hover:bg-spotify-row",
} as const;

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  type?: "button" | "submit" | "reset";
  variant?: keyof typeof variants;
};

export const Button = (buttonProps: ButtonProps) => (
  <button
    {...buttonProps}
    className={twMerge(
      "rounded-lg border-0 text-white focus:outline-none disabled:opacity-50",
      variants[buttonProps.variant ?? "primary"],
      buttonProps.className
    )}
  />
);
