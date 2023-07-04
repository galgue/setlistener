import { currentUserSpotifyFetcher } from "./spotifyFetcher";

export const addPlaylistCoverImage = async (
  playlistId: string,
  image: string
) => {
  await currentUserSpotifyFetcher(
    `https://api.spotify.com/v1/playlists/${playlistId}/images`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "image/jpeg",
      },
      body: image,
    }
  );
};
