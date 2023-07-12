import { ArtistInfo } from "./ArtistInfo";
import { SongsList } from "./SongsList";

type SpotifyPlaylistProps = {
  artistId: string;
  top?: number;
  tour?: string;
  withCovers?: string;
  minOccurrences?: number;
  artistName: string;
  defaultSearch?: boolean;
};

export const SpotifyPlaylist = ({
  artistId,
  top,
  tour,
  minOccurrences,
  withCovers,
  artistName,
  defaultSearch = false,
}: SpotifyPlaylistProps) => (
  <div className="flex h-full flex-col gap-1 bg-spotify-background">
    <div className="flex">
      <ArtistInfo artistName={artistName} />
    </div>
    <div className="flex-1 overflow-scroll rounded-lg">
      <SongsList
        artistId={artistId}
        artistName={artistName}
        minOccurrences={minOccurrences}
        top={top}
        tour={tour}
        withCovers={withCovers}
        defaultSearch={defaultSearch}
      />
    </div>
  </div>
);
