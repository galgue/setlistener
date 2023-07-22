import Image from "next/image";
import Link from "next/link";
import { SpotifySong } from "~/server/spotifyApi/schemas";

type ArtistItemProps = {
  artistName: string;
  artistId: string;
  description?: string;
  bannerImage?: {
    url: string;
    width: number;
    height: number;
  };
};

export const ArtistInfo = async ({
  artistId,
  artistName,
  description,
  bannerImage,
}: ArtistItemProps) => {
  console.log(artistId, artistName, description);
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
      <div className="flex h-16 flex-row items-center rounded-lg bg-spotify-row px-3 py-1 text-white">
        <div className="mr-auto flex flex-col">
          <h1 className=" font-semibold">{artistName}</h1>
          <p className="text-sm">{description}</p>
        </div>
        {bannerImage && (
          <div className="aspect-square h-4/5 overflow-hidden rounded-full">
            <Image
              src={bannerImage.url}
              width={bannerImage.width}
              height={bannerImage.height}
              alt={`${artistName} banner`}
            />
          </div>
        )}
      </div>
    </Link>
  );
};
