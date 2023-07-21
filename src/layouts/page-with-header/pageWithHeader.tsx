import type { PropsWithChildren } from "react";
import { getUserServerSession } from "~/utils/auth";
import { PreviousPageButton } from "./PreviousPageButton";
import { UserInfo } from "./auth/UserInfo";

export const PageWithHeader = async ({
  children,
  title,
  withoutBackButton,
}: PropsWithChildren<{
  title?: string;
  withoutBackButton?: boolean;
}>) => {
  const session = await getUserServerSession();
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="grid min-h-[72px] w-full grid-cols-[15%_auto_15%]">
        {!withoutBackButton && (
          <PreviousPageButton
            type="button"
            className="my-auto mr-auto h-10 w-10 py-1 text-center text-2xl font-bold text-white"
          >
            <BackIcon />
          </PreviousPageButton>
        )}
        <div className="col-start-2 m-auto flex gap-2 self-center py-4">
          {title?.split(" ").map((word, index) => (
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
        <div className="col-start-3 m-auto">
          <UserInfo session={session} />
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-1 overflow-scroll">
        {children}
      </div>
    </div>
  );
};

const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    className="h-full w-full"
  >
    <g>
      <path d="M3,22a1,1,0,0,1-1-1V3A1,1,0,1,1,4,3V21A1,1,0,0,1,3,22Z" />
      <path d="M21,5V17.76A2.69,2.69,0,0,1,16.81,20L7.33,13.68a2,2,0,0,1,0-3.32l10.56-7A2,2,0,0,1,21,5Z" />
    </g>
  </svg>
);
