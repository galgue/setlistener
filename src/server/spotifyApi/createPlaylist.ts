import { SpotifyPlaylistSchema } from "./schemas";
import { currentUserSpotifyFetcher } from "./spotifyFetcher";

export const createPlaylist = async (artistName: string) => {
  const date = new Date().toDateString().split(",")[0];
  const description =
    "A playlist created by Setlister" + (date ? ` at ${date}` : "");
  const response = await currentUserSpotifyFetcher(
    (sessionId) => `https://api.spotify.com/v1/users/${sessionId}/playlists`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${artistName} - Setlist`,
        description,
        public: false,
      }),
    }
  );

  const playlist = SpotifyPlaylistSchema.parse(await response.json());

  return playlist;
};
