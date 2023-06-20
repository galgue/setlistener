import { z } from "zod";
import { apiCaller } from "~/server/api/root";
import { ArtistInfo } from "./ArtistItem";

const ParamsSchema = z.object({
  name: z.string(),
});

const Search = async ({ params }: { params: unknown }) => {
  const { name } = ParamsSchema.parse(params);

  const data = await apiCaller.artist.search({ text: name });

  return (
    <div className="h-full">
      <h1>Select Artist</h1>
      <div className="flex h-full flex-col gap-1 overflow-scroll">
        {data.map((artist) => (
          <ArtistInfo
            key={artist.mbid}
            artistId={artist.mbid}
            artistName={artist.name}
            description={artist.disambiguation}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
