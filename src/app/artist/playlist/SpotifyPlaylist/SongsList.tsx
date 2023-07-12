import { apiCaller } from "~/server/api/root";
import { SongInfo } from "./SongInfo";
import type { SpotifySong } from "~/server/spotifyApi/schemas";
import { PlaylistDataAtom } from "~/app/stores/current-playlist";

type SongsListProps = {
  artistId: string;
  top?: number;
  tour?: string;
  withCovers?: string;
  minOccurrences?: number;
  artistName: string;
  defaultSearch?: boolean;
};

export const SongsList = async ({
  artistId,
  top,
  tour,
  minOccurrences,
  withCovers,
  artistName,
  defaultSearch = false,
}: SongsListProps) => {
  const songs = await apiCaller.artist.songsOfLastShows({
    artistId,
    top,
    tour,
    minOccurrences,
    withCovers,
    defaultSearch,
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
      <PlaylistDataAtom data={SongsInfo} />
      <div className="h-full w-full overflow-scroll">
        {SongsInfo.map((song) => (
          <SongInfo key={`${song.name}-${artistName}`} song={song} />
        ))}
      </div>
    </>
  );
};
