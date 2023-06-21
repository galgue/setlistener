import { z } from "zod";
import { SpotifyPlaylist } from "./SpotifyPlaylist";

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
      <div className="flex h-[10%] flex-row items-center justify-between">
        <div className="text-3xl font-bold">{"<"}</div>
        <div>main page</div>
      </div>
      <div className="flex-10 h-[80%]">
        <SpotifyPlaylist
          {...{ artistId, top, tour, minOccurrences, withCovers, artistName }}
        />
      </div>
      <div className="flex h-[10%] flex-row items-center justify-center">
        <button
          type="button"
          className=" h-5/6 w-full rounded-lg bg-spotify-green py-1 text-2xl font-medium text-white hover:bg-green-800 "
        >
          Save Playlist
        </button>
      </div>
    </div>
  );
};

export default SearchSettingsPage;
