import { z } from "zod";
import { SpotifyPlaylist } from "./SpotifyPlaylist";
import { CreatePlaylistButton } from "./CreatePlaylistButton";
import { getUserServerSession } from "~/utils/auth";

const ParamsSchema = z.object({
  artistId: z.string(),
  artistName: z.string(),
  numberOfShows: z.coerce.number().optional(),
  tour: z.string().optional(),
  withCovers: z.string().optional(),
  minOccurrences: z.coerce.number().optional(),
});

const SearchSettingsPage = async ({
  searchParams,
}: {
  searchParams: unknown;
}) => {
  const {
    numberOfShows,
    tour,
    minOccurrences,
    withCovers,
    artistName,
    artistId,
  } = ParamsSchema.parse(searchParams);

  const session = await getUserServerSession();

  if (!artistName) {
    return <></>;
  }

  return (
    <div className="flex h-full flex-col gap-4 text-white">
      <div className="h-[80%] flex-[6]">
        <SpotifyPlaylist
          {...{
            artistId,
            top: numberOfShows,
            tour,
            minOccurrences,
            withCovers,
            artistName,
          }}
        />
      </div>
      <div className="flex-1">
        <CreatePlaylistButton
          artistName={artistName}
          isUserConnected={!!session}
        />
      </div>
    </div>
  );
};

export default SearchSettingsPage;
