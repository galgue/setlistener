"use client";

import { signOut } from "next-auth/react";

export const LogoutButton = (
  buttonProps: Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "onClick"
  >
) => {
  return <button onClick={() => void signOut()} {...buttonProps} />;
};
