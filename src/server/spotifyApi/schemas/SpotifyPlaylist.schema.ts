import { z } from "zod";

export const SpotifyPlaylistSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  public: z.boolean(),
  uri: z
    .string()
    .transform((uri) =>
      uri.replace("spotify:playlist:", "https://open.spotify.com/playlist/")
    ),
});
