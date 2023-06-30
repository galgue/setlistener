import type { PropsWithChildren } from "react";
import { getUserServerSession } from "~/lib/auth";
import { PreviousPageButton } from "./PreviousPageButton";
import { UserInfo } from "./auth/UserInfo";

export const PageWithHeader = async ({
  children,
  title,
}: PropsWithChildren<{
  title: string;
}>) => {
  const session = await getUserServerSession();
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="grid min-h-[72px] w-full grid-cols-[15%_auto_15%]">
        <PreviousPageButton
          type="button"
          className="my-auto mr-auto h-10 w-10 rounded-lg bg-spotify-header py-1 text-center text-2xl font-bold text-white hover:bg-green-800"
        >
          {"<"}
        </PreviousPageButton>
        <div className="m-auto flex gap-2 self-center py-4">
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
        <div className="m-auto">
          <UserInfo session={session} />
        </div>
      </div>
      <div className="flex h-full w-full flex-col gap-1 overflow-scroll">
        {children}
      </div>
    </div>
  );
};
