import { z } from "zod";
import { apiCaller } from "~/server/api/root";
import { ArtistInfo } from "./ArtistItem";

const ParamsSchema = z.object({
  name: z.string(),
});

const Search = async ({ params }: { params: unknown }) => {
  const { name: undecodedName } = ParamsSchema.parse(params);

  const name = decodeURIComponent(undecodedName);

  const artistsInfo = await apiCaller.artist.search({ text: name });

  const artistsData = (
    await Promise.all(
      artistsInfo.map(async (artist) => {
        const artistSpotifyData = await apiCaller.spotify.getArtistInfo({
          artistName: artist.name,
        });
        if (!artistSpotifyData) {
          return null;
        }
        return {
          bannerImage: artistSpotifyData.bannerImage,
          ...artist,
        };
      })
    )
  ).filter(Boolean);

  if (artistsData.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <h1 className="self-center text-center text-2xl text-white">
          No results found for {name}
        </h1>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-3">
      {artistsData.map(({ mbid, name, disambiguation, bannerImage }) => (
        <ArtistInfo
          key={mbid}
          artistId={mbid}
          artistName={name}
          description={disambiguation}
          bannerImage={bannerImage}
        />
      ))}
    </div>
  );
};

export default Search;
