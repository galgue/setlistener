import { ArtistInfo } from "./ArtistInfo";
import { SongsList } from "./SongsList";

type SpotifyPlaylistProps = {
  artistId: string;
  top?: number;
  tour?: string;
  withCovers?: string;
  minOccurrences?: number;
  artistName: string;
};

export const SpotifyPlaylist = ({
  artistId,
  top,
  tour,
  minOccurrences,
  withCovers,
  artistName,
}: SpotifyPlaylistProps) => (
  <div className="flex h-full flex-col bg-spotify-background p-1">
    <div className="flex">
      <ArtistInfo artistName={artistName} />
    </div>
    <div className="flex-1 overflow-scroll">
      <SongsList
        artistId={artistId}
        artistName={artistName}
        minOccurrences={minOccurrences}
        top={top}
        tour={tour}
        withCovers={withCovers}
      />
    </div>
  </div>
);
