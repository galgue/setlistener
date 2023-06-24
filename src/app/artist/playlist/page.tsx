import { z } from "zod";
import { SpotifyPlaylist } from "./SpotifyPlaylist";
import { LoginButton } from "./LoginButton";
import Link from "next/link";
import { PreviousPageButton } from "~/components/PreviousPageButton";

export const metadata = {
  title: "Playlist",
};

const ParamsSchema = z.object({
  artistId: z.string(),
  artistName: z.string(),
  top: z.number().optional(),
  tour: z.string().optional(),
  withCovers: z.string().optional(),
  minOccurrences: z.number().optional(),
});

const SearchSettingsPage = ({ searchParams }: { searchParams: unknown }) => {
  const { top, tour, minOccurrences, withCovers, artistName, artistId } =
    ParamsSchema.parse(searchParams);

  if (!artistName) {
    return <></>;
  }

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
      <div className="flex-10 h-[80%]">
        <SpotifyPlaylist
          {...{ artistId, top, tour, minOccurrences, withCovers, artistName }}
        />
      </div>
      <div className="flex h-[10%] flex-row items-center justify-center">
        <LoginButton />
      </div>
    </div>
  );
};

export default SearchSettingsPage;
