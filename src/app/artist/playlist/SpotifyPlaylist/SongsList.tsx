import { apiCaller } from "~/server/api/root";
import { SongInfo } from "./SongInfo";
import { PlaylistData } from "../PlaylistData";
import type { SpotifySong } from "~/server/spotifyApi/schemas";

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

  const SongsInfo = (
    await Promise.all(
      songs.map(({ cover, name }) => {
        return apiCaller.spotify.getSong({
          artist: artistName,
          songName: name,
          coverArtist: cover,
        });
      })
    )
  ).filter((song) => song !== undefined) as SpotifySong[];

  return (
    <>
      <PlaylistData data={SongsInfo} />
      <div className="h-full w-full overflow-scroll">
        {SongsInfo.map((song) => (
          <SongInfo key={`${song.name}-${artistName}`} song={song} />
        ))}
      </div>
    </>
  );
};
