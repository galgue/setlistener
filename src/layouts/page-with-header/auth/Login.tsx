"use client";

import { signIn } from "next-auth/react";

export const LoginButton = (
  buttonProps: Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "onClick"
  >
) => {
  return <button onClick={() => void signIn("spotify")} {...buttonProps} />;
};
