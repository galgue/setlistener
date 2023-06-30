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
      <div className="flex-10 h-[85%]">
        <SpotifyPlaylist
          {...{ artistId, top, tour, minOccurrences, withCovers, artistName }}
        />
      </div>
      <div className="flex h-[15%] flex-row items-center justify-center"></div>
    </div>
  );
};

export default SearchSettingsPage;
