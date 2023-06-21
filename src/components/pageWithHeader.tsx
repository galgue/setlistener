import type { PropsWithChildren } from "react";

export const PageWithHeader = ({
  children,
  title,
}: PropsWithChildren<{
  title: string;
}>) => (
  <div className="flex h-full flex-col items-center justify-center">
    <div className="flex gap-2 py-4">
      {title.split(" ").map((word, index) => (
        <div
          key={index}
          className={`text-4xl text-${
            index % 2 === 0 ? "spotify-green" : "white"
          }`}
        >
          {word}
        </div>
      ))}
    </div>
    <div className="flex h-full w-full flex-col gap-1 overflow-scroll">
      {children}
    </div>
  </div>
);
