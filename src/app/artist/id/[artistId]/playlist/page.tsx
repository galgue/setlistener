import { appRouter } from "~/server/api/root";

const SearchSettingsPage = async ({
  params,
  searchParams,
}: {
  params: { artistId: string };
  searchParams: {
    top?: number;
    tour?: string;
    withCovers?: string;
    minOccurrences?: number;
  };
}) => {
  const { artistId } = params;
  const { top, tour, minOccurrences, withCovers } = searchParams;

  const caller = appRouter.createCaller({});

  const songs = await caller.artist.songsOfLastShows({
    artistId,
    top,
    tour,
    minOccurrences,
    withCovers,
  });

  return (
    <>
      <h1>Playlist</h1>
      <ul>
        {songs?.map((song) => (
          <li key={song.name}>{song.name}</li>
        ))}
      </ul>
    </>
  );
};

export default SearchSettingsPage;
