import { z } from "zod";
import { apiCaller } from "~/server/api/root";
import { Options } from "./options";

const ParamsSchema = z.object({
  artistId: z.string(),
  artistName: z.string(),
});

const SearchSettingsPage = async ({
  searchParams,
}: {
  searchParams: unknown;
}) => {
  const { artistId, artistName } = ParamsSchema.parse(searchParams);

  const tours = await apiCaller.artist.tours({ artistId });

  return (
    <div className="h-full w-full">
      <Options artistId={artistId} tours={tours} artistName={artistName} />
    </div>
  );
};

export default SearchSettingsPage;
