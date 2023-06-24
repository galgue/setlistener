"use client";

import { useRouter } from "next/navigation";

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

  return <button type="button" {...buttonProps} onClick={onClick} />;
};
