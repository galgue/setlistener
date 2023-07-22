import Image from "next/image";
import { apiCaller } from "~/server/api/root";

type ArtistInfoProps = {
  artistName: string;
};

export const ArtistInfo = async ({ artistName }: ArtistInfoProps) => {
  const artist = await apiCaller.spotify.getArtistInfo({
    artistName,
  });

  return (
    <div className="flex h-16 w-full flex-row items-center gap-2 rounded-lg bg-spotify-header pl-2">
      {artist?.bannerImage && (
        <div className="aspect-square h-4/5 overflow-hidden rounded-full">
          <Image
            width={artist?.bannerImage.width}
            height={artist?.bannerImage.height}
            src={artist?.bannerImage.url}
            alt={artist?.name || ""}
          />
        </div>
      )}
      <div>
        <div className=" text-white">{artist?.name}</div>
        <div className="font-thin text-[#A0A0A0]">Artist</div>
      </div>
    </div>
  );
};
