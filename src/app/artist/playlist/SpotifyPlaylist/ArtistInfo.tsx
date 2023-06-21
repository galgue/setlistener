import Image from "next/image";
import { apiCaller } from "~/server/api/root";

type ArtistInfoProps = {
  artistName: string;
};

export const ArtistInfo = async ({ artistName }: ArtistInfoProps) => {
  const artist = await apiCaller.spotify.getArtistInfo({
    artistName,
  });

  const smallImage = artist?.images?.reduce((prev, curr) => {
    if (prev === undefined) {
      return curr;
    }
    if (prev.height < curr.height) {
      return prev;
    }
    return curr;
  }, artist?.images[0]);

  return (
    <div className="flex h-16 w-full flex-row items-center gap-2 rounded-lg bg-spotify-header pl-2">
      {smallImage && (
        <div className="aspect-square h-4/5 overflow-hidden rounded-full">
          <Image
            width={smallImage.width}
            height={smallImage.height}
            src={smallImage.url}
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
