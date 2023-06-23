import { apiCaller } from "~/server/api/root";
import { SongInfo } from "./SongInfo";

type SongsListProps = {
  artistId: string;
  top?: number;
  tour?: string;
  withCovers?: string;
  minOccurrences?: number;
  artistName: string;
};

export const SongsList = async ({
  artistId,
  top,
  tour,
  minOccurrences,
  withCovers,
  artistName,
}: SongsListProps) => {
  const songs = await apiCaller.artist.songsOfLastShows({
    artistId,
    top,
    tour,
    minOccurrences,
    withCovers,
  });

  return (
    <div className="h-full w-full overflow-scroll">
      {songs.map((song) => (
        <SongInfo
          key={`${song.name}-${artistName}`}
          artist={artistName}
          songName={song.name}
          coverArtist={song.cover}
        />
      ))}
    </div>
  );
};
