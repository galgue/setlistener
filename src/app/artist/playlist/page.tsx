import { z } from "zod";
import { SpotifyPlaylist } from "./SpotifyPlaylist";
import { CreatePlaylistButton } from "./CreatePlaylistButton";

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
    <div className="flex h-full flex-col gap-4 text-white">
      <div className="h-[80%] flex-[6]">
        <SpotifyPlaylist
          {...{ artistId, top, tour, minOccurrences, withCovers, artistName }}
        />
      </div>
      <div className="flex-1">
        <CreatePlaylistButton artistName={artistName} />
      </div>
    </div>
  );
};

export default SearchSettingsPage;
