import type { SpotifySong } from "~/server/spotifyApi/schemas";
import { SongLogo } from "./SongLogo";

type SongInfoProps = {
  song: SpotifySong;
};

export const SongInfo = ({ song }: SongInfoProps) => {
  return (
    <div className="flex h-16 w-full flex-row items-center gap-2 bg-spotify-row pl-2">
      <SongLogo
        logo={song.bannerImage}
        songName={song.name}
        previewUrl={song.preview_url}
      />
      <div>
        <div className="flex gap-1">
          <div className="line-clamp-1 max-w-[10rem] overflow-hidden text-white">
            {song.name}
          </div>
          <div className="font-thin text-[#A0A0A0]">
            ({msToTime(song.duration_ms)})
          </div>
        </div>
        <div className="line-clamp-1 w-60 overflow-hidden font-thin text-[#A0A0A0]">
          {song.album.name}
        </div>
      </div>
    </div>
  );
};

const msToTime = (duration: number) => {
  const seconds = Math.floor((duration / 1000) % 60);
  const minutes = Math.floor((duration / (1000 * 60)) % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};
