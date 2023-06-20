import { z } from "zod";
import { ArtistInfo } from "./ArtistInfo";
import { SongsList } from "./SongsList";

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
    <div className="flex h-full flex-col bg-spotify-background p-1">
      <div className="flex">
        <ArtistInfo artistName={artistName} />
      </div>
      <div className="flex-1 overflow-scroll">
        <SongsList
          artistId={artistId}
          artistName={artistName}
          minOccurrences={minOccurrences}
          top={top}
          tour={tour}
          withCovers={withCovers}
        />
      </div>
    </div>
  );
};

export default SearchSettingsPage;
