import { SpotifyPlaylistSchema } from "./schemas";
import { currentUserSpotifyFetcher } from "./spotifyFetcher";

export const deletePlaylist = async (artistName: string) => {
  const artistNameEncoded = encodeURIComponent(artistName);
  const response = await currentUserSpotifyFetcher(
    `https://api.spotify.com/v1/search?q=${artistNameEncoded}&type=playlist&limit=1&offset=0`
  );

  const playlist = SpotifyPlaylistSchema.parse(await response.json());

  return playlist;
};
