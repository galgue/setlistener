import { appRouter } from "~/server/api/root";
import { Options } from "./options";

const PlaylistPage = async ({ params }: { params: { artistId: string } }) => {
  const { artistId } = params;

  const caller = appRouter.createCaller({});

  const tours = await caller.artist.tours({ artistId });

  return (
    <>
      <h1>Search Settings</h1>
      <Options artistId={artistId} tours={tours} />
    </>
  );
};

export default PlaylistPage;
