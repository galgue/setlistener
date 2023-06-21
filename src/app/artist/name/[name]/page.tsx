import { z } from "zod";
import { apiCaller } from "~/server/api/root";
import { ArtistInfo } from "./ArtistItem";

const ParamsSchema = z.object({
  name: z.string(),
});

const Search = async ({ params }: { params: unknown }) => {
  const { name } = ParamsSchema.parse(params);

  const data = await apiCaller.artist.search({ text: name });

  if (data.length === 0) {
    return (
      <div className="flex h-full">
        <h1 className="self-center text-center text-2xl text-white">
          No results found for {name}
        </h1>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {data.map((artist) => (
        <ArtistInfo
          key={artist.mbid}
          artistId={artist.mbid}
          artistName={artist.name}
          description={artist.disambiguation}
        />
      ))}
    </div>
  );
};

export default Search;
