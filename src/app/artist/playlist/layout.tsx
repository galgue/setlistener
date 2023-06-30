import Link from "next/link";
import { PreviousPageButton } from "~/components/PreviousPageButton";
import "~/styles/globals.css";

export const metadata = {
  title: "Playlist",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col text-white">
      <div className="flex h-[10%] flex-row items-center justify-between py-2">
        <PreviousPageButton
          type="button"
          className="h-full w-10 rounded-lg bg-spotify-header py-1 text-2xl font-extrabold text-white hover:bg-green-800"
        >
          {"<"}
        </PreviousPageButton>
        <Link href="/" className="h-full">
          <button
            type="button"
            className="text-1xl h-full w-28 rounded-lg bg-spotify-green py-1 font-medium text-white hover:bg-green-800"
          >
            main page
          </button>
        </Link>
      </div>
      <div className="flex-10 h-[90%]">{children}</div>
    </div>
  );
}
