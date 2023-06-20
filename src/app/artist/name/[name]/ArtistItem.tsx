import Image from "next/image";
import Link from "next/link";
import { apiCaller } from "~/server/api/root";

type ArtistItemProps = {
  artistName: string;
  artistId: string;
  description?: string;
};

export const ArtistInfo = async ({
  artistId,
  artistName,
  description,
}: ArtistItemProps) => {
  const artist = await apiCaller.spotify.getArtistInfo({
    artistName,
  });

  return (
    <Link
      href={{
        pathname: "/artist/search-settings",
        query: {
          artistId,
          artistName,
        },
      }}
    >
      <div className="flex h-16 flex-row items-center rounded-lg bg-spotify-row p-1 text-white">
        <div className="mr-auto flex flex-col">
          <h1 className=" font-semibold">{artistName}</h1>
          <p className="text-sm">{description}</p>
        </div>
        {artist?.bannerImage && (
          <div className="aspect-square h-4/5 overflow-hidden rounded-full">
            <Image
              src={artist?.bannerImage.url}
              width={artist?.bannerImage.width}
              height={artist?.bannerImage.height}
              alt={`${artistName} banner`}
            />
          </div>
        )}
      </div>
    </Link>
  );
};
