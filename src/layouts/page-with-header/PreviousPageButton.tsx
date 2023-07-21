"use client";

import { useRouter } from "next/navigation";
import { Button } from "~/components";

export const PreviousPageButton = (
  buttonProps: Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "onClick"
  >
) => {
  const router = useRouter();

  const onClick = () => {
    router.back();
  };

  return (
    <Button
      type="button"
      {...buttonProps}
      onClick={onClick}
      variant="secondary"
    />
  );
};
