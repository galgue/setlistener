import { currentUserSpotifyFetcher } from "./spotifyFetcher";

export const addSongsToPlaylist = async (
  playlistId: string,
  songUris: string[]
) => {
  await currentUserSpotifyFetcher(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: songUris,
        position: 0,
      }),
    }
  );
};
